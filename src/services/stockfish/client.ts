export interface StockfishEvaluation {
  bestMove: string | null;
  centipawns: number | null;
  mate: number | null;
  depth: number | null;
  principalVariation: string[];
}

const enginePath = "/stockfish/stockfish-18-lite-single.js";

type EngineListener = (line: string) => void;

class StockfishClient {
  private worker: Worker | null = null;
  private listeners = new Set<EngineListener>();

  analyzeFen(fen: string, depth = 10, timeoutMs = 10000): Promise<StockfishEvaluation> {
    if (typeof window === "undefined") {
      return Promise.reject(new Error("Stockfish analysis is only available in the browser."));
    }

    const worker = this.getWorker();
    let latest: StockfishEvaluation = {
      bestMove: null,
      centipawns: null,
      mate: null,
      depth: null,
      principalVariation: [],
    };

    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => {
        this.listeners.delete(onLine);
        worker.postMessage("stop");
        reject(new Error("Stockfish analysis timed out."));
      }, timeoutMs);

      const onLine = (line: string) => {
        latest = parseEvaluationLine(line, latest);

        if (line.startsWith("bestmove")) {
          window.clearTimeout(timer);
          this.listeners.delete(onLine);
          resolve({
            ...latest,
            bestMove: line.split(/\s+/)[1] ?? latest.bestMove,
          });
        }
      };

      this.listeners.add(onLine);
      worker.postMessage("uci");
      worker.postMessage("isready");
      worker.postMessage("ucinewgame");
      worker.postMessage(`position fen ${fen}`);
      worker.postMessage(`go depth ${depth}`);
    });
  }

  terminate(): void {
    this.worker?.terminate();
    this.worker = null;
    this.listeners.clear();
  }

  private getWorker(): Worker {
    if (!this.worker) {
      this.worker = new Worker(enginePath);
      this.worker.onmessage = (event: MessageEvent<string>) => {
        const line = String(event.data);
        this.listeners.forEach((listener) => listener(line));
      };
    }

    return this.worker;
  }
}

let sharedClient: StockfishClient | null = null;

export function getStockfishClient(): StockfishClient {
  sharedClient ??= new StockfishClient();
  return sharedClient;
}

function parseEvaluationLine(line: string, current: StockfishEvaluation): StockfishEvaluation {
  if (!line.startsWith("info")) {
    return current;
  }

  const depth = Number(line.match(/\bdepth\s+(\d+)/)?.[1] ?? current.depth);
  const centipawnsMatch = line.match(/\bscore\s+cp\s+(-?\d+)/);
  const mateMatch = line.match(/\bscore\s+mate\s+(-?\d+)/);
  const principalVariation = line.match(/\bpv\s+(.+)$/)?.[1]?.split(/\s+/) ?? current.principalVariation;

  return {
    bestMove: current.bestMove,
    centipawns: centipawnsMatch ? Number(centipawnsMatch[1]) : current.centipawns,
    mate: mateMatch ? Number(mateMatch[1]) : current.mate,
    depth: Number.isFinite(depth) ? depth : current.depth,
    principalVariation,
  };
}

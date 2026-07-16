export interface StockfishEvaluation {
  bestMove: string | null;
  centipawns: number | null;
  mate: number | null;
  depth: number | null;
  nodes: number | null;
  nps: number | null;
  hashfull: number | null;
  principalVariation: string[];
}

const enginePath = "/stockfish/stockfish-18-lite-single.js";

export type EngineMetrics = {
  depth: number;
  nodes: number;
  nps: number;
  hashfull: number;
  isThinking: boolean;
};

type EngineListener = (line: string) => void;
type MetricsListener = (metrics: EngineMetrics) => void;

class StockfishClient {
  private worker: Worker | null = null;
  private listeners = new Set<EngineListener>();
  private metricsListeners = new Set<MetricsListener>();
  private currentMetrics: EngineMetrics = {
    depth: 0,
    nodes: 0,
    nps: 0,
    hashfull: 0,
    isThinking: false
  };

  analyzeFen(fen: string, depth = 10, timeoutMs = 10000): Promise<StockfishEvaluation> {
    if (typeof window === "undefined") {
      return Promise.reject(new Error("Stockfish analysis is only available in the browser."));
    }

    const worker = this.getWorker();
    this.updateMetrics({ isThinking: true });

    let latest: StockfishEvaluation = {
      bestMove: null,
      centipawns: null,
      mate: null,
      depth: null,
      nodes: null,
      nps: null,
      hashfull: null,
      principalVariation: [],
    };

    return new Promise((resolve, reject) => {
      const timer = window.setTimeout(() => {
        this.listeners.delete(onLine);
        worker.postMessage("stop");
        this.updateMetrics({ isThinking: false });
        reject(new Error("Stockfish analysis timed out."));
      }, timeoutMs);

      const onLine = (line: string) => {
        latest = parseEvaluationLine(line, latest);

        // Update live metrics
        if (latest.depth || latest.nodes) {
          this.updateMetrics({
            depth: latest.depth ?? this.currentMetrics.depth,
            nodes: latest.nodes ?? this.currentMetrics.nodes,
            nps: latest.nps ?? this.currentMetrics.nps,
            hashfull: latest.hashfull ?? this.currentMetrics.hashfull
          });
        }

        if (line.startsWith("bestmove")) {
          window.clearTimeout(timer);
          this.listeners.delete(onLine);
          this.updateMetrics({ isThinking: false });
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
    this.updateMetrics({ isThinking: false });
  }

  subscribeToMetrics(callback: MetricsListener): () => void {
    this.metricsListeners.add(callback);
    callback(this.currentMetrics);
    return () => this.metricsListeners.delete(callback);
  }

  private updateMetrics(update: Partial<EngineMetrics>) {
    this.currentMetrics = { ...this.currentMetrics, ...update };
    this.metricsListeners.forEach(l => l(this.currentMetrics));
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
  const nodes = Number(line.match(/\bnodes\s+(\d+)/)?.[1] ?? current.nodes);
  const nps = Number(line.match(/\bnps\s+(\d+)/)?.[1] ?? current.nps);
  const hashfull = Number(line.match(/\bhashfull\s+(\d+)/)?.[1] ?? current.hashfull);
  const centipawnsMatch = line.match(/\bscore\s+cp\s+(-?\d+)/);
  const mateMatch = line.match(/\bscore\s+mate\s+(-?\d+)/);
  const principalVariation = line.match(/\bpv\s+(.+)$/)?.[1]?.split(/\s+/) ?? current.principalVariation;

  return {
    bestMove: current.bestMove,
    centipawns: centipawnsMatch ? Number(centipawnsMatch[1]) : current.centipawns,
    mate: mateMatch ? Number(mateMatch[1]) : current.mate,
    depth: Number.isFinite(depth) ? depth : current.depth,
    nodes: Number.isFinite(nodes) ? nodes : current.nodes,
    nps: Number.isFinite(nps) ? nps : current.nps,
    hashfull: Number.isFinite(hashfull) ? hashfull : current.hashfull,
    principalVariation,
  };
}

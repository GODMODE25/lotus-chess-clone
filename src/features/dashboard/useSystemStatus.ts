import { useState, useEffect } from "react";
import { getStockfishClient, type EngineMetrics } from "@/services/stockfish/client";

export function useSystemStatus() {
  const [status, setStatus] = useState({
    cpu: "12.4%",
    latency: "22ms",
    depth: "32/50",
    enginePower: "85%",
    nodes: "4.2M/s",
    isThinking: false
  });

  useEffect(() => {
    const client = getStockfishClient();
    
    const unsubscribe = client.subscribeToMetrics((metrics: EngineMetrics) => {
      setStatus(prev => ({
        ...prev,
        depth: metrics.isThinking ? `${metrics.depth}/50` : prev.depth,
        nodes: metrics.isThinking ? `${(metrics.nodes / 1000000).toFixed(1)}M/s` : prev.nodes,
        isThinking: metrics.isThinking,
        enginePower: metrics.isThinking ? `${Math.min(99, 80 + metrics.depth)}%` : "15%"
      }));
    });

    const interval = setInterval(() => {
      setStatus(prev => {
        // Only simulate CPU and Latency, or everything if not thinking
        const simulatedCpu = `${(prev.isThinking ? 40 + Math.random() * 20 : 5 + Math.random() * 5).toFixed(1)}%`;
        const simulatedLatency = `${Math.floor(prev.isThinking ? 15 + Math.random() * 5 : 20 + Math.random() * 10)}ms`;
        
        if (prev.isThinking) {
          return { ...prev, cpu: simulatedCpu, latency: simulatedLatency };
        }

        return {
          ...prev,
          cpu: simulatedCpu,
          latency: simulatedLatency,
          nodes: `${(0.1 + Math.random() * 0.1).toFixed(1)}M/s`,
          enginePower: "15%"
        };
      });
    }, 3000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return status;
}

import React, { useState, useRef } from 'react';
import { CanvasNode, CanvasConnection } from '../../types';
import { Plus, Trash2, RotateCcw, Move, ArrowRight, Type, HelpCircle } from 'lucide-react';

interface VisualThinkingCanvasProps {
  initialNodes?: CanvasNode[];
  initialConnections?: CanvasConnection[];
  onChange?: (data: { nodes: CanvasNode[]; connections: CanvasConnection[] }) => void;
  readOnly?: boolean;
}

const DEFAULT_NODES: CanvasNode[] = [
  { id: 'node-1', type: 'premise', label: 'Primary System State: 480 kW Available', x: 40, y: 50 },
  { id: 'node-2', type: 'assumption', label: 'Assumption: Generator B stays at 35%', x: 40, y: 160 },
  { id: 'node-3', type: 'counter', label: 'Bottleneck: Negative pressure loss in 12 min', x: 380, y: 50 },
  { id: 'node-4', type: 'conclusion', label: 'Action: Duty-cycle airflow; preserve NICU', x: 380, y: 160 },
];

const DEFAULT_CONNECTIONS: CanvasConnection[] = [
  { id: 'conn-1', fromId: 'node-1', toId: 'node-2' },
  { id: 'conn-2', fromId: 'node-2', toId: 'node-4' },
  { id: 'conn-3', fromId: 'node-3', toId: 'node-4' },
];

export const VisualThinkingCanvas: React.FC<VisualThinkingCanvasProps> = ({
  initialNodes,
  initialConnections,
  onChange,
  readOnly = false,
}) => {
  const [nodes, setNodes] = useState<CanvasNode[]>(initialNodes || DEFAULT_NODES);
  const [connections, setConnections] = useState<CanvasConnection[]>(
    initialConnections || DEFAULT_CONNECTIONS
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [connectSourceId, setConnectSourceId] = useState<string | null>(null);
  const [isConnectingMode, setIsConnectingMode] = useState<boolean>(false);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const updateState = (newNodes: CanvasNode[], newConns: CanvasConnection[]) => {
    setNodes(newNodes);
    setConnections(newConns);
    if (onChange) {
      onChange({ nodes: newNodes, connections: newConns });
    }
  };

  const handleAddNode = (type: CanvasNode['type']) => {
    if (readOnly) return;
    const defaultLabels: Record<CanvasNode['type'], string> = {
      premise: 'New Core Premise',
      assumption: 'Unverified Assumption',
      evidence: 'Quantitative Evidence',
      counter: 'Counter-Argument / Constraint',
      conclusion: 'Derived Decision / Policy',
    };

    const newNode: CanvasNode = {
      id: `node-${Date.now()}`,
      type,
      label: defaultLabels[type],
      x: 60 + (nodes.length % 5) * 40,
      y: 80 + (nodes.length % 4) * 35,
    };

    const updated = [...nodes, newNode];
    updateState(updated, connections);
    setSelectedNodeId(newNode.id);
  };

  const handleUpdateLabel = (id: string, newLabel: string) => {
    if (readOnly) return;
    const updated = nodes.map((n) => (n.id === id ? { ...n, label: newLabel } : n));
    updateState(updated, connections);
  };

  const handleDeleteNode = (id: string) => {
    if (readOnly) return;
    const updatedNodes = nodes.filter((n) => n.id !== id);
    const updatedConns = connections.filter((c) => c.fromId !== id && c.toId !== id);
    updateState(updatedNodes, updatedConns);
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  const handleNodeClick = (nodeId: string) => {
    if (readOnly) return;
    if (isConnectingMode) {
      if (!connectSourceId) {
        setConnectSourceId(nodeId);
      } else if (connectSourceId !== nodeId) {
        // Create connection
        const newConn: CanvasConnection = {
          id: `conn-${Date.now()}`,
          fromId: connectSourceId,
          toId: nodeId,
        };
        const updated = [...connections, newConn];
        updateState(nodes, updated);
        setConnectSourceId(null);
        setIsConnectingMode(false);
      }
    } else {
      setSelectedNodeId(nodeId);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (readOnly || isConnectingMode) return;
    setDraggingNodeId(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (node && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      dragOffsetRef.current = {
        x: e.clientX - rect.left - node.x,
        y: e.clientY - rect.top - node.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId || !canvasRef.current || readOnly) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = Math.max(10, Math.min(rect.width - 240, e.clientX - rect.left - dragOffsetRef.current.x));
    const newY = Math.max(10, Math.min(rect.height - 80, e.clientY - rect.top - dragOffsetRef.current.y));

    const updated = nodes.map((n) =>
      n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n
    );
    setNodes(updated);
  };

  const handleMouseUp = () => {
    if (draggingNodeId) {
      setDraggingNodeId(null);
      if (onChange) {
        onChange({ nodes, connections });
      }
    }
  };

  const handleResetCanvas = () => {
    if (readOnly) return;
    updateState(DEFAULT_NODES, DEFAULT_CONNECTIONS);
    setSelectedNodeId(null);
    setConnectSourceId(null);
    setIsConnectingMode(false);
  };

  const handleClearAll = () => {
    if (readOnly) return;
    updateState([], []);
    setSelectedNodeId(null);
    setConnectSourceId(null);
    setIsConnectingMode(false);
  };

  const getNodeColor = (type: CanvasNode['type']) => {
    switch (type) {
      case 'premise':
        return 'border-[#163323] bg-[#EBF2EC] text-[#163323]';
      case 'assumption':
        return 'border-[#997A3D] bg-[#F7F2E7] text-[#61491E]';
      case 'counter':
        return 'border-[#8B3A3A] bg-[#FDF0ED] text-[#702929]';
      case 'conclusion':
        return 'border-[#2D5A43] bg-[#E3EDE7] text-[#163323]';
      case 'evidence':
        return 'border-[#4E7A5D] bg-[#EFF5F1] text-[#244330]';
      default:
        return 'border-stone-300 bg-white text-stone-800';
    }
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  return (
    <div className="border border-stone-300 rounded-lg bg-stone-50 overflow-hidden">
      {/* Canvas Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-stone-100 border-b border-stone-200 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-stone-700 mr-2">Visual Logic Sandbox</span>
          {!readOnly && (
            <>
              <button
                type="button"
                onClick={() => handleAddNode('premise')}
                className="px-2.5 py-1 bg-[#163323] text-white rounded font-medium hover:bg-[#1f4530] transition-colors"
              >
                + Premise
              </button>
              <button
                type="button"
                onClick={() => handleAddNode('assumption')}
                className="px-2.5 py-1 bg-[#997A3D] text-white rounded font-medium hover:bg-[#80642f] transition-colors"
              >
                + Assumption
              </button>
              <button
                type="button"
                onClick={() => handleAddNode('counter')}
                className="px-2.5 py-1 bg-[#8B3A3A] text-white rounded font-medium hover:bg-[#732f2f] transition-colors"
              >
                + Constraint
              </button>
              <button
                type="button"
                onClick={() => handleAddNode('conclusion')}
                className="px-2.5 py-1 bg-[#4E7A5D] text-white rounded font-medium hover:bg-[#3f644b] transition-colors"
              >
                + Decision
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsConnectingMode(!isConnectingMode);
                  setConnectSourceId(null);
                }}
                className={`px-2.5 py-1 rounded font-medium border transition-colors ${
                  isConnectingMode
                    ? 'bg-[#163323] text-white border-[#163323]'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                }`}
              >
                {isConnectingMode ? 'Connecting (Click 2 nodes)...' : 'Connect Nodes'}
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!readOnly && (
            <>
              <button
                type="button"
                onClick={handleResetCanvas}
                className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                title="Reset to default example"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="p-1 text-stone-600 hover:text-rose-700 transition-colors"
                title="Clear canvas"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
          <span className="text-stone-400">· Prototype Canvas</span>
        </div>
      </div>

      {/* Interactive Drawing Stage */}
      <div
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative w-full h-80 bg-[#FAF8F5] select-none overflow-hidden cursor-crosshair"
      >
        {/* Subtle grid lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <line x1="0" y1="24" x2="24" y2="24" stroke="#EAE6DC" strokeWidth="1" />
              <line x1="24" y1="0" x2="24" y2="24" stroke="#EAE6DC" strokeWidth="1" />
            </pattern>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#4E7A5D" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />

          {/* Render Connections */}
          {connections.map((conn) => {
            const fromNode = nodes.find((n) => n.id === conn.fromId);
            const toNode = nodes.find((n) => n.id === conn.toId);
            if (!fromNode || !toNode) return null;

            const x1 = fromNode.x + 110;
            const y1 = fromNode.y + 35;
            const x2 = toNode.x + 110;
            const y2 = toNode.y + 35;

            // Simple bezier path
            const dx = Math.abs(x2 - x1) * 0.5;
            const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

            return (
              <g key={conn.id}>
                <path
                  d={pathData}
                  fill="none"
                  stroke="#4E7A5D"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  markerEnd="url(#arrowhead)"
                />
              </g>
            );
          })}
        </svg>

        {/* Render Nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const isConnectSource = connectSourceId === node.id;

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              onMouseDown={(e) => handleMouseDown(e, node.id)}
              onClick={() => handleNodeClick(node.id)}
              className={`absolute w-56 rounded border p-2.5 text-xs transition-shadow cursor-grab active:cursor-grabbing ${getNodeColor(
                node.type
              )} ${
                isSelected ? 'ring-2 ring-[#163323]' : ''
              } ${isConnectSource ? 'ring-2 ring-[#997A3D] animate-pulse' : ''}`}
            >
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-black/10">
                <span className="font-semibold uppercase tracking-wider text-[10px]">
                  {node.type}
                </span>
                {!readOnly && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNode(node.id);
                    }}
                    className="text-stone-400 hover:text-stone-700"
                  >
                    ×
                  </button>
                )}
              </div>
              <p className="font-medium leading-snug line-clamp-2">{node.label}</p>
            </div>
          );
        })}

        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-stone-500 pointer-events-none">
            Canvas is empty. Click "+ Premise" or other nodes above to map out your solution.
          </div>
        )}
      </div>

      {/* Selected Node Editor Bar */}
      {selectedNode && !readOnly && (
        <div className="flex items-center gap-3 px-4 py-2 bg-stone-100 border-t border-stone-200 text-xs">
          <span className="font-semibold text-stone-700">Edit Node:</span>
          <input
            type="text"
            value={selectedNode.label}
            onChange={(e) => handleUpdateLabel(selectedNode.id, e.target.value)}
            className="flex-1 bg-white border border-stone-300 rounded px-2 py-1 text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#163323]"
          />
          <button
            type="button"
            onClick={() => handleDeleteNode(selectedNode.id)}
            className="text-rose-700 hover:text-rose-900 px-2 py-1 font-medium"
          >
            Delete Node
          </button>
        </div>
      )}
    </div>
  );
};

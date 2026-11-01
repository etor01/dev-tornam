"use client";

import { useState } from "react";
import { Cpu, Database, Eye, HardDrive, Layers, Radio, Shield, Zap } from "lucide-react";

interface NodeDetail {
  id: string;
  label: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  spec: string;
  tech: string;
}

const MEDISCAN_NODES: NodeDetail[] = [
  {
    id: "input",
    label: "Medical Scan",
    sub: "DICOM / PNG",
    icon: Eye,
    spec: "Lossless pixel matrix normalization",
    tech: "HTML5 Canvas API",
  },
  {
    id: "preprocess",
    label: "Local Vectorizer",
    sub: "Tensors",
    icon: Layers,
    spec: "Region-of-interest feature extraction",
    tech: "Float32 Matrix Engine",
  },
  {
    id: "engine",
    label: "Llama 3.2 Core",
    sub: "On-device AI",
    icon: Cpu,
    spec: "Zero cloud transmission • Zero HIPAA leak",
    tech: "Ollama Daemon (Local)",
  },
  {
    id: "output",
    label: "Clinical Report",
    sub: "Diagnostic JSON",
    icon: Zap,
    spec: "Structured EHR-compatible risk indicators",
    tech: "< 240ms latency",
  },
];

const AGRIBOOST_NODES: NodeDetail[] = [
  {
    id: "sensor",
    label: "Field Sensors",
    sub: "Soil / Ambient",
    icon: Radio,
    spec: "Moisture, NPK, and ambient temp probes",
    tech: "ESP32 Firmware (C++)",
  },
  {
    id: "gateway",
    label: "Edge Gateway",
    sub: "Telemetry",
    icon: HardDrive,
    spec: "Store-and-forward queue during outages",
    tech: "MQTT / HTTP Fallback",
  },
  {
    id: "cloud",
    label: "Supabase Core",
    sub: "PostgreSQL",
    icon: Database,
    spec: "Real-time subscriptions & row security",
    tech: "Next.js App Router",
  },
  {
    id: "market",
    label: "Commerce Engine",
    sub: "Bulk Orders",
    icon: Shield,
    spec: "Automated payment escrow & delivery",
    tech: "PayStack API",
  },
];

export default function ProjectDiagram({ slug }: { slug: string }) {
  const isMediscan = slug === "mediscan";
  const isAgriBoost = slug === "agriboost";

  const nodes = isMediscan ? MEDISCAN_NODES : isAgriBoost ? AGRIBOOST_NODES : null;
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(isMediscan ? 2 : 1);

  if (!nodes) {
    // Default minimalist technical schematic for other software/hardware projects
    return (
      <div className="blueprintVisualHeader">
        <div className="blueprintVisualTopBar">
          <span className="blueprintTraceLabel">ARCHITECTURAL SCHEMATIC // REV 2.4</span>
          <span className="blueprintBadge">SYSTEMS ENGINE</span>
        </div>
        <div className="blueprintTerminalPreview">
          <div className="blueprintTraceLine">
            <span className="text-blue-600 font-bold">$</span> runtime::init --mode=distributed --security=strict
          </div>
          <div className="blueprintSubTrace">
            [SYS-OK] IPC daemon active • Memory pool allocated: 32MB • Zero network leak
          </div>
        </div>
      </div>
    );
  }

  const activeNode = nodes[activeNodeIndex];

  return (
    <div className="interactiveArchitectureDiagram">
      {/* Title Bar */}
      <div className="diagramTitleBar">
        <div className="flex items-center gap-2">
          <span className="diagramLed" />
          <span className="diagramTitle">
            SYSTEM ARCHITECTURE // {isMediscan ? "INFERENCE PIPELINE" : "IOT TELEMETRY FLOW"}
          </span>
        </div>
        <span className="diagramHint">Select node to inspect spec</span>
      </div>

      {/* Nodes Track */}
      <div className="diagramNodesTrack" role="tablist">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const isActive = activeNodeIndex === i;
          return (
            <div key={node.id} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => setActiveNodeIndex(i)}
                className={`diagramNodeBtn ${isActive ? "active" : ""}`}
                role="tab"
                aria-selected={isActive}
              >
                <div className="nodeIconBox">
                  <Icon size={14} className={isActive ? "text-blue-600" : "text-zinc-600"} />
                </div>
                <div className="nodeTextWrap">
                  <span className="nodeLabel">{node.label}</span>
                  <span className="nodeSub">{node.sub}</span>
                </div>
              </button>
              {i < nodes.length - 1 && (
                <div className="nodeConnector" aria-hidden="true">
                  <span className={`connectorDot ${isActive ? "active" : ""}`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Node Spec Callout (Technical Blueprint Footnote) */}
      <div className="diagramSpecCallout">
        <div className="specBadge">NODE SPEC // 0{activeNodeIndex + 1}</div>
        <div className="specContent">
          <span className="specPrimary">{activeNode.spec}</span>
          <span className="specDivider">•</span>
          <span className="specTech">{activeNode.tech}</span>
        </div>
      </div>
    </div>
  );
}

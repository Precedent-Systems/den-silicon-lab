"use client";

import React, { useState } from 'react';
import { 
  Cpu, 
  ShoppingBag, 
  Activity, 
  Sliders, 
  CheckCircle2, 
  Flame, 
  Database, 
  TrendingUp, 
  Truck, 
  Wrench, 
  DollarSign, 
  Radio,
  Zap,
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ComponentItem {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  vintageYear: number;
  stock: number;
  supplier: string;
  deliveryDays: number;
  image: string;
  description: string;
  specs: {
    socketOrBus: string;
    tdpWatts: number;
    clockSpeed: string;
    vramOrCap: string;
  };
  metrics: {
    marginPercent: number;
    roasRatio: number;
    adStatus: 'BOOSTED' | 'ACTIVE' | 'PAUSED';
  };
}

const CATALOG_COMPONENTS: ComponentItem[] = [
  {
    id: 'comp_1',
    name: 'Apex RTX 4090 Ultra-Custom Bench Edition',
    category: 'Graphics / GPU',
    price: 1899.00,
    cost: 1350.00,
    vintageYear: 2024,
    stock: 4,
    supplier: 'Direct-Tech Global',
    deliveryDays: 2,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=60',
    description: 'Custom copper-piped benchmark edition GPU with hand-tuned bios profiles and real-time telemetry output.',
    specs: { socketOrBus: 'PCIe 4.0 x16', tdpWatts: 450, clockSpeed: '2.52 GHz', vramOrCap: '24GB GDDR6X' },
    metrics: { marginPercent: 28.9, roasRatio: 3.8, adStatus: 'BOOSTED' }
  },
  {
    id: 'comp_2',
    name: '3dfx Voodoo3 3000 AGP 16MB Legacy Card',
    category: 'Legacy Video',
    price: 245.00,
    cost: 110.00,
    vintageYear: 1999,
    stock: 2,
    supplier: 'Oregon Repair Warehouse',
    deliveryDays: 3,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60',
    description: 'Restored 1999 Glide-accelerated 3D card. Passed full 48-hour looping Quake II stress diagnostics on bench.',
    specs: { socketOrBus: 'AGP 2X/4X', tdpWatts: 15, clockSpeed: '166 MHz', vramOrCap: '16MB SDRAM' },
    metrics: { marginPercent: 55.1, roasRatio: 4.2, adStatus: 'BOOSTED' }
  },
  {
    id: 'comp_3',
    name: 'Vector Extreme 2TB NVMe PCIe Gen4 SSD',
    category: 'Storage Engine',
    price: 239.00,
    cost: 152.00,
    vintageYear: 2025,
    stock: 12,
    supplier: 'Silicon Supply Hub',
    deliveryDays: 1,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=60',
    description: 'Ultra-fast NVMe storage with dynamic margin pricing linked to live wholesale inventory levels.',
    specs: { socketOrBus: 'M.2 NVMe', tdpWatts: 8, clockSpeed: '7,300 MB/s', vramOrCap: '2TB TLC' },
    metrics: { marginPercent: 36.4, roasRatio: 3.1, adStatus: 'ACTIVE' }
  },
  {
    id: 'comp_4',
    name: 'Pentium III 1.0GHz Slot 1 Processor + Bench Heatsink',
    category: 'Retro CPU',
    price: 185.00,
    cost: 75.00,
    vintageYear: 2000,
    stock: 3,
    supplier: 'NW Bench Depot',
    deliveryDays: 2,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60',
    description: 'Original Coppermine core Slot 1 CPU. Cleaned, recapped, and verified under Windows 98 SE bench tests.',
    specs: { socketOrBus: 'Slot 1 SECC2', tdpWatts: 29, clockSpeed: '1000 MHz', vramOrCap: '256KB L2' },
    metrics: { marginPercent: 59.4, roasRatio: 2.9, adStatus: 'ACTIVE' }
  }
];

export default function RetroFutureAutomatedEngine() {
  const [activeTab, setActiveTab] = useState<'STORE' | 'DASHBOARD' | 'BUILDER'>('STORE');
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Smart Configurator State
  const [selectedTarget, setSelectedTarget] = useState<'VINTAGE_GAMING' | 'AI_BENCH_WORKSTATION'>('VINTAGE_GAMING');
  const [marginOptimization, setMarginOptimization] = useState(true);

  const handleCheckout = async (comp: ComponentItem) => {
    setLoadingId(comp.id);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            name: comp.name,
            price: comp.price,
            description: comp.description,
            image: comp.image,
            quantity: 1
          }]
        })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout failed');
      }
    } catch (err) {
      alert('Error initiating checkout.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#120e0a] text-[#e8ded1] font-mono selection:bg-[#c87a32] selection:text-[#120e0a]">
      {/* 90s Wood-Panel & Industrial Header */}
      <header className="border-b-4 border-[#5c3a1e] bg-gradient-to-r from-[#24170d] via-[#2e1d10] to-[#24170d] sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-[#c87a32] p-2.5 rounded border-2 border-[#ff9d42] text-[#120e0a] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
              <Wrench className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-wider text-[#ffd8a8] uppercase font-serif drop-shadow-md">
                  The Computer Den & Silicon Lab
                </h1>
                <span className="bg-[#ff4500] text-white text-[10px] px-2 py-0.5 rounded font-bold animate-pulse">
                  LIVE ENGINE
                </span>
              </div>
              <p className="text-xs text-[#a38b72] tracking-tight">
                90s Oregon Repair Bench Aesthetics • Powered by Dropshipping Margin Algorithm
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2 bg-[#1a1109] p-1.5 rounded-lg border border-[#422915]">
            <button
              onClick={() => setActiveTab('STORE')}
              className={`px-4 py-2 text-xs font-bold rounded transition flex items-center gap-2 ${
                activeTab === 'STORE'
                  ? 'bg-[#c87a32] text-[#120e0a] shadow-lg'
                  : 'text-[#a38b72] hover:text-[#ffd8a8] hover:bg-[#2b1c0f]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Storefront Bench
            </button>
            <button
              onClick={() => setActiveTab('BUILDER')}
              className={`px-4 py-2 text-xs font-bold rounded transition flex items-center gap-2 ${
                activeTab === 'BUILDER'
                  ? 'bg-[#c87a32] text-[#120e0a] shadow-lg'
                  : 'text-[#a38b72] hover:text-[#ffd8a8] hover:bg-[#2b1c0f]'
              }`}
            >
              <Sliders className="w-4 h-4" /> Smart Consult Builder
            </button>
            <button
              onClick={() => setActiveTab('DASHBOARD')}
              className={`px-4 py-2 text-xs font-bold rounded transition flex items-center gap-2 ${
                activeTab === 'DASHBOARD'
                  ? 'bg-[#3b82f6] text-white shadow-lg'
                  : 'text-[#a38b72] hover:text-cyan-400 hover:bg-[#15233b]'
              }`}
            >
              <Activity className="w-4 h-4" /> Operator Wall-St Desk
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* VIEW 1: FRONTEND STOREFRONT BENCH */}
        {activeTab === 'STORE' && (
          <div className="space-y-8">
            {/* Concept Banner */}
            <div className="bg-gradient-to-r from-[#2a1b0e] via-[#382312] to-[#2a1b0e] border-2 border-[#6e4624] rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-full bg-contain bg-no-repeat opacity-10 pointer-events-none bg-right" />
              <div className="max-w-3xl space-y-2">
                <span className="text-[11px] uppercase tracking-widest text-[#ff9d42] font-bold bg-[#422711] px-2.5 py-1 rounded border border-[#854d20]">
                  30 Years Legacy • Oregon Repair Bench Meets High-Frequency Dropship Algortihm
                </span>
                <h2 className="text-3xl font-serif font-bold text-[#ffe8d1]">
                  Nostalgic Repair Bench. High-Frequency Hardware Desk.
                </h2>
                <p className="text-xs text-[#b8a088] leading-relaxed">
                  Every component features a split-screen: nostalgic Oregon bench pricing on the left, and live Silicon Lab specs (TDP, bus speeds, real-time supplier routing) on the right.
                </p>
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {CATALOG_COMPONENTS.map((comp) => (
                <div 
                  key={comp.id}
                  className="bg-[#1c130b] border-2 border-[#4d321b] rounded-xl overflow-hidden shadow-2xl hover:border-[#c87a32] transition flex flex-col justify-between"
                >
                  {/* Top Split Section */}
                  <div>
                    {/* Header bar */}
                    <div className="bg-[#291b0e] px-4 py-2.5 border-b border-[#4d321b] flex items-center justify-between text-xs">
                      <span className="font-bold text-[#ff9d42] flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" /> Est. {comp.vintageYear} Archive
                      </span>
                      <span className="bg-[#120e0a] text-cyan-400 font-mono px-2 py-0.5 rounded border border-cyan-900/60 text-[10px]">
                        Supplier: {comp.supplier} (Est. {comp.deliveryDays}d delivery)
                      </span>
                    </div>

                    {/* Component Info Split */}
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                      {/* Left: Vintage Photo & Price */}
                      <div className="p-4 bg-[#140d07] border-b sm:border-b-0 sm:border-r border-[#3d2715] flex flex-col justify-between">
                        <div>
                          <img 
                            src={comp.image} 
                            alt={comp.name}
                            className="w-full h-36 object-cover rounded border border-[#4d321b] mb-3"
                          />
                          <h3 className="text-base font-bold text-[#ffe8d1] leading-tight mb-1">{comp.name}</h3>
                          <p className="text-[11px] text-[#99836e] leading-snug">{comp.description}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#362212] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase text-[#806b58] block">Bench Retail</span>
                            <span className="text-2xl font-bold font-serif text-[#ffaa4f]">${comp.price.toFixed(2)}</span>
                          </div>
                          <span className="text-[10px] bg-[#291b0e] text-[#b89574] px-2 py-1 rounded border border-[#52371f]">
                            Stock: {comp.stock} units
                          </span>
                        </div>
                      </div>

                      {/* Right: Silicon Lab Telemetry & Specs */}
                      <div className="p-4 bg-[#18111a]/40 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-cyan-400 pb-2 border-b border-cyan-900/30 mb-3">
                            <span className="flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> Silicon Lab Spec Sheet</span>
                            <span className="text-[10px] text-slate-400 font-mono">LIVE TELEMETRY</span>
                          </div>

                          <div className="space-y-2 text-xs font-mono">
                            <div className="flex justify-between bg-[#120e0a] p-1.5 rounded border border-[#2d2217]">
                              <span className="text-slate-400">Bus / Socket:</span>
                              <span className="text-cyan-300 font-bold">{comp.specs.socketOrBus}</span>
                            </div>
                            <div className="flex justify-between bg-[#120e0a] p-1.5 rounded border border-[#2d2217]">
                              <span className="text-slate-400">Clock Speed:</span>
                              <span className="text-emerald-400 font-bold">{comp.specs.clockSpeed}</span>
                            </div>
                            <div className="flex justify-between bg-[#120e0a] p-1.5 rounded border border-[#2d2217]">
                              <span className="text-slate-400">Cap / Memory:</span>
                              <span className="text-amber-300 font-bold">{comp.specs.vramOrCap}</span>
                            </div>
                            <div className="flex justify-between bg-[#120e0a] p-1.5 rounded border border-[#2d2217]">
                              <span className="text-slate-400">TDP Thermal:</span>
                              <span className="text-rose-400 font-bold">{comp.specs.tdpWatts} Watts</span>
                            </div>
                          </div>
                        </div>

                        {/* Automated Margin Indicator */}
                        <div className="mt-4 p-2 bg-[#0e1626] rounded border border-blue-900/40 text-[10px] text-blue-300 flex items-center justify-between">
                          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-blue-400" /> Margin: +{comp.metrics.marginPercent}%</span>
                          <span className="font-bold text-emerald-400">ROAS {comp.metrics.roasRatio}x</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buy / Checkout Action */}
                  <div className="p-3 bg-[#24180e] border-t border-[#4d321b] flex items-center justify-between">
                    <span className="text-[11px] text-[#a38b72] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#ff9d42]" /> Auto-Routed to Wholesale Warehouse
                    </span>
                    <button
                      onClick={() => handleCheckout(comp)}
                      disabled={loadingId === comp.id}
                      className="bg-[#c87a32] hover:bg-[#e0893a] disabled:opacity-50 text-[#120e0a] font-bold px-5 py-2 rounded text-xs transition flex items-center gap-2 shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {loadingId === comp.id ? 'Routing PO...' : 'Order Component'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: SMART CONSULT BUILDER */}
        {activeTab === 'BUILDER' && (
          <div className="bg-[#1c130b] border-2 border-[#4d321b] rounded-xl p-8 shadow-2xl space-y-8">
            <div className="border-b border-[#4d321b] pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#ffe8d1] flex items-center gap-2">
                  <Sliders className="w-6 h-6 text-[#ff9d42]" /> Automated "Smart Consult" Configurator
                </h2>
                <p className="text-xs text-[#a38b72]">
                  The algorithm evaluates compatibility, real-time supplier stock, and net profitability before suggesting build combos.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-[#140d07] p-2 rounded-lg border border-[#3d2715] text-xs">
                <span className="text-[#a38b72]">Margin Optimization:</span>
                <button
                  onClick={() => setMarginOptimization(!marginOptimization)}
                  className={`px-3 py-1 rounded font-bold text-[10px] transition ${
                    marginOptimization ? 'bg-emerald-600 text-white' : 'bg-[#3b2716] text-[#a38b72]'
                  }`}
                >
                  {marginOptimization ? 'ENABLED (MAX MARGIN)' : 'MANUAL'}
                </button>
              </div>
            </div>

            {/* Target Select */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => setSelectedTarget('VINTAGE_GAMING')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition ${
                  selectedTarget === 'VINTAGE_GAMING'
                    ? 'border-[#ff9d42] bg-[#291a0e]'
                    : 'border-[#3b2716] bg-[#140d07] hover:border-[#52371f]'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#ffe8d1] flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-500" /> Windows 98 / Glide Retro Build
                  </h3>
                  {selectedTarget === 'VINTAGE_GAMING' && <CheckCircle2 className="w-5 h-5 text-[#ff9d42]" />}
                </div>
                <p className="text-xs text-[#a38b72]">
                  Pentium III slot 1 + 3dfx Voodoo3. Configured for maximum historical accuracy & margin yield.
                </p>
              </div>

              <div 
                onClick={() => setSelectedTarget('AI_BENCH_WORKSTATION')}
                className={`p-5 rounded-xl border-2 cursor-pointer transition ${
                  selectedTarget === 'AI_BENCH_WORKSTATION'
                    ? 'border-[#ff9d42] bg-[#291a0e]'
                    : 'border-[#3b2716] bg-[#140d07] hover:border-[#52371f]'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-[#ffe8d1] flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" /> Apex RTX 4090 AI Workstation
                  </h3>
                  {selectedTarget === 'AI_BENCH_WORKSTATION' && <CheckCircle2 className="w-5 h-5 text-[#ff9d42]" />}
                </div>
                <p className="text-xs text-[#a38b72]">
                  High-frequency trading workstation combo. Optimized for high NVMe throughput and maximum ROAS.
                </p>
              </div>
            </div>

            {/* Algorithmic Component Recommendation Output */}
            <div className="bg-[#140d07] border border-[#3d2715] rounded-xl p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#362212] pb-3">
                <span className="text-[#ff9d42] font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Algorithmic Component Swap Recommendation
                </span>
                <span className="text-[#806b58]">Checked 3 Dropshipping Warehouses</span>
              </div>

              <div className="space-y-3">
                <div className="bg-[#1c130b] p-3 rounded border border-[#3b2716] flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase block">Suggested Processor Combo</span>
                    <span className="text-[#ffe8d1] font-bold">Pentium III 1.0GHz Slot 1 + Bench Cooler</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#ffaa4f] font-bold">$185.00</span>
                    <span className="text-[10px] text-slate-400 block">Supplier Stock: 3 units</span>
                  </div>
                </div>

                <div className="bg-[#1c130b] p-3 rounded border border-[#3b2716] flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase block">Graphics Accelerator Swap</span>
                    <span className="text-[#ffe8d1] font-bold">3dfx Voodoo3 3000 AGP 16MB</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#ffaa4f] font-bold">$245.00</span>
                    <span className="text-[10px] text-slate-400 block">Wholesale Margin: +55.1%</span>
                  </div>
                </div>
              </div>

              {/* Delivery & Margin Summary */}
              <div className="pt-4 border-t border-[#362212] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[#99836e] block">Combined Package Price</span>
                  <span className="text-3xl font-serif font-bold text-[#ffaa4f]">$430.00</span>
                </div>
                <button
                  onClick={() => alert("Smart Consult build submitted to dropship routing pipeline!")}
                  className="bg-[#c87a32] hover:bg-[#e0893a] text-[#120e0a] font-bold px-6 py-3 rounded-lg transition flex items-center gap-2 shadow-xl"
                >
                  Confirm Configured Order <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: OPERATOR WALL-STREET DASHBOARD */}
        {activeTab === 'DASHBOARD' && (
          <div className="bg-[#0b1320] border-2 border-[#1e3a8a] rounded-xl p-8 text-slate-100 space-y-8 font-mono">
            {/* Operator Header */}
            <div className="border-b border-blue-900/50 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-cyan-300 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-blue-400" /> High-Frequency Hardware Operator Desk
                  </h2>
                  <span className="bg-emerald-950 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-700 font-bold">
                    CONNECTED TO DROPSHIP AGENTS
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Real-time supplier inventory, automated margin re-pricing, and ad-spend optimization engine.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-[#0e172a] p-3 rounded-lg border border-blue-900/60 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">DAILY TARGET</span>
                  <span className="text-emerald-400 font-bold text-lg">$4,300.00</span>
                </div>
                <div className="border-l border-slate-700 pl-4">
                  <span className="text-slate-400 block text-[10px]">CURRENT ROAS</span>
                  <span className="text-cyan-300 font-bold text-lg">3.2x</span>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-[#0f172a] p-4 rounded-lg border border-blue-900/40">
                <span className="text-[10px] text-slate-400 block">DAILY ORDERS</span>
                <span className="text-2xl font-bold text-slate-100">43 Orders</span>
                <span className="text-[10px] text-emerald-400 block mt-1">↑ Scaling to 50+ target</span>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-lg border border-blue-900/40">
                <span className="text-[10px] text-slate-400 block">CONVERSION RATE</span>
                <span className="text-2xl font-bold text-cyan-300">2.9%</span>
                <span className="text-[10px] text-slate-400 block mt-1">Bench checkout mode</span>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-lg border border-blue-900/40">
                <span className="text-[10px] text-slate-400 block">AVG MARGIN</span>
                <span className="text-2xl font-bold text-emerald-400">44.9%</span>
                <span className="text-[10px] text-emerald-400 block mt-1">Auto-adjusted pricing</span>
              </div>
              <div className="bg-[#0f172a] p-4 rounded-lg border border-blue-900/40">
                <span className="text-[10px] text-slate-400 block">4-PRODUCT PIPELINE</span>
                <span className="text-2xl font-bold text-amber-400">4 Units Left</span>
                <span className="text-[10px] text-amber-400 block mt-1">Re-ordering triggered</span>
              </div>
            </div>

            {/* Live Re-Pricing & Ad Optimization Ledger */}
            <div className="bg-[#0f172a] p-5 rounded-lg border border-blue-900/40 space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Database className="w-4 h-4" /> Live Dropship Supplier Re-Pricing Engine
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-blue-900/60 text-slate-400 text-[10px]">
                      <th className="pb-2">COMPONENT NAME</th>
                      <th className="pb-2">SUPPLIER COST</th>
                      <th className="pb-2">DYNAMIC RETAIL</th>
                      <th className="pb-2">MARGIN</th>
                      <th className="pb-2">AD CAMPAIGN STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-900/30">
                    {CATALOG_COMPONENTS.map((c) => (
                      <tr key={c.id}>
                        <td className="py-2.5 font-bold text-slate-200">{c.name}</td>
                        <td className="py-2.5 text-slate-400">${c.cost.toFixed(2)}</td>
                        <td className="py-2.5 font-bold text-[#ffaa4f]">${c.price.toFixed(2)}</td>
                        <td className="py-2.5 text-emerald-400">+{c.metrics.marginPercent}%</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.metrics.adStatus === 'BOOSTED'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                              : 'bg-blue-950 text-blue-300 border border-blue-700'
                          }`}>
                            {c.metrics.adStatus} ({c.metrics.roasRatio}x ROAS)
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 4. HERITAGE LIVE ANALYTICS TICKER */}
      <footer className="border-t-2 border-[#5c3a1e] bg-[#1a1109] py-3 px-6 fixed bottom-0 left-0 right-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-[#a38b72]">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="font-bold text-[#ffe8d1] uppercase text-[11px]">HERITAGE LIVE ANALYTICS TICKER:</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap font-mono text-[11px] text-[#ffd8a8]">
            <span className="inline-block animate-marquee space-x-8">
              <span>30 Years Legacy</span>
              <span className="text-slate-500">|</span>
              <span className="text-emerald-400 font-bold">43 Orders Today</span>
              <span className="text-slate-500">|</span>
              <span>Scaling to 50+ Target</span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-300 font-bold">3.2x ROAS on Apex GPUs</span>
              <span className="text-slate-500">|</span>
              <span className="text-amber-400 font-bold">4 Units Left in Pipeline</span>
              <span className="text-slate-500">|</span>
              <span>Target Revenue: $4.3k/day</span>
            </span>
          </div>

          <span className="hidden md:inline-block text-[10px] bg-[#2e1d10] px-2 py-1 rounded text-[#ff9d42] border border-[#52371f]">
            Soul of 90s Shop • Brain of Dropship Alg.
          </span>
        </div>
      </footer>
    </div>
  );
}

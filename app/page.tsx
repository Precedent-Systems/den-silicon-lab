"use client";

import React, { useState } from 'react';
import { 
  Wrench, 
  ShoppingBag, 
  Cpu, 
  Truck, 
  CheckCircle2, 
  Flame, 
  Sliders, 
  ArrowRight,
  ShieldCheck,
  Activity,
  Search,
  Sparkles,
  Layers,
  MessageSquare
} from 'lucide-react';

interface ComponentItem {
  id: string;
  name: string;
  category: string;
  price: number;
  marketSavingNote: string;
  benchBadge: string;
  stockNote: string;
  deliveryEstimate: string;
  image: string;
  craftStory: string;
  specs: {
    busOrSocket: string;
    thermalOrTdp: string;
    speed: string;
    capacity: string;
  };
}

const BENCH_CATALOG: ComponentItem[] = [
  {
    id: 'comp_1',
    name: 'Apex RTX 4090 Ultra-Custom Bench Edition',
    category: 'Modern Workstation GPU',
    price: 1899.00,
    marketSavingNote: '+28.9% below market — direct supplier link passes savings to your build',
    benchBadge: 'Bench Tested • Thermal Repasted',
    stockNote: 'Only 4 units remaining in Oregon bench stock',
    deliveryEstimate: 'Guaranteed 2 days to your door (stock pre-verified)',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop&q=60',
    craftStory: 'Custom copper-piped edition. Each unit undergoes a 24-hour stress run on Don\'t Oregon repair bench, flashed with optimized BIOS profiles for peak acoustic efficiency.',
    specs: {
      busOrSocket: 'PCIe 4.0 x16',
      thermalOrTdp: '450W Thermal Envelope',
      speed: '2.52 GHz Boost',
      capacity: '24GB GDDR6X'
    }
  },
  {
    id: 'comp_2',
    name: '3dfx Voodoo3 3000 AGP 16MB Legacy Card',
    category: '1999 Glide Legend',
    price: 245.00,
    marketSavingNote: 'Authentic 1999 stock — fully recapped in our Oregon shop',
    benchBadge: 'Battle-Tested • Passed 48-Hour Quake II Loop',
    stockNote: 'Only 2 left in stock — vintage original',
    deliveryEstimate: 'Ships in 3 days from Oregon Repair Warehouse',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60',
    craftStory: 'Restored 1999 Glide-accelerated 3D powerhouse. Hand-cleaned, recapped with Japanese capacitors, and loop-tested on native MS-DOS & Windows 98 SE hardware.',
    specs: {
      busOrSocket: 'AGP 2X/4X Slot',
      thermalOrTdp: 'Passive Heatsink',
      speed: '166 MHz Core Clock',
      capacity: '16MB High-Speed SDRAM'
    }
  },
  {
    id: 'comp_3',
    name: 'Vector Extreme 2TB NVMe PCIe Gen4 SSD',
    category: 'High-Throughput Storage',
    price: 239.00,
    marketSavingNote: 'Pre-indexed wholesale pricing — best performance per dollar',
    benchBadge: 'Pre-Formated • Lifetime Diagnostics',
    stockNote: '12 units in stock at local hub',
    deliveryEstimate: 'Arrives in 1–2 business days (automated warehouse dispatch)',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=600&auto=format&fit=crop&q=60',
    craftStory: 'Ultra-fast NVMe storage engineered for massive dataset loading and instant boot cycles. Pre-tested for zero bad blocks before leaving the warehouse.',
    specs: {
      busOrSocket: 'M.2 2280 NVMe',
      thermalOrTdp: 'Aluminum Heatshield',
      speed: '7,300 MB/s Read',
      capacity: '2TB TLC Flash'
    }
  },
  {
    id: 'comp_4',
    name: 'Pentium III 1.0GHz Slot 1 + Custom Bench Cooler',
    category: 'Y2K Peak CPU',
    price: 185.00,
    marketSavingNote: 'Cleaned, recapped, and verified under Windows 98 SE bench tests',
    benchBadge: 'Original Coppermine • Bench Verified',
    stockNote: '3 units remaining in local inventory',
    deliveryEstimate: 'Ships in 2 days (stock confirmed)',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60',
    craftStory: 'The holy grail of turn-of-the-millennium PC gaming. Pin-checked, thermal repasted, and paired with a whisper-quiet dual-ball-bearing bench cooler.',
    specs: {
      busOrSocket: 'Slot 1 SECC2',
      thermalOrTdp: '29W Max TDP',
      speed: '1000 MHz (133MHz FSB)',
      capacity: '256KB On-Die L2'
    }
  }
];

export default function DenSiliconLabCustomerStore() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showOperatorDesk, setShowOperatorDesk] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');
  const [consultOutput, setConsultOutput] = useState<string | null>(null);

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
            description: comp.craftStory,
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

  const handleConsultMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(budgetInput);
    if (isNaN(val) || val <= 0) {
      setConsultOutput("Tell us your target budget (e.g. $450 or $2,000) and we'll instantly algorithm-match your build.");
      return;
    }

    if (val < 300) {
      setConsultOutput(`For $${val}: We recommend starting with the Sound Blaster / Pentium III Slot 1 foundation. Checked stock & pre-verified for 2-day delivery.`);
    } else if (val < 1000) {
      setConsultOutput(`For $${val}: Perfect budget for the 3dfx Voodoo3 3000 ($245) + Pentium III 1.0GHz ($185) combo. Total: $430.00 — +55% value yield, battle-tested on the bench.`);
    } else {
      setConsultOutput(`For $${val}: High-end recommendation: Apex RTX 4090 ($1,899) + Vector 2TB NVMe ($239). Pre-routed for 1-2 day delivery with direct supplier margin savings passed to you.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#140e08] text-[#f2e8dc] font-sans selection:bg-[#c87a32] selection:text-[#140e08]">
      
      {/* 90s Oregon Shop Wood-Grain Header */}
      <header className="border-b-4 border-[#5c391c] bg-gradient-to-r from-[#21140a] via-[#2c1b0d] to-[#21140a] sticky top-0 z-50 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3.5">
            <div className="bg-[#c87a32] p-2.5 rounded border-2 border-[#ff9d42] text-[#140e08] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-extrabold tracking-wide text-[#ffe0ba] uppercase drop-shadow">
                Den Silicon Lab
              </h1>
              <p className="text-xs text-[#a68d74] font-medium tracking-tight">
                Vintage Oregon PC Repair Bench • Hand-Tested Hardware & Custom Setups
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="text-[#a68d74] flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Oregon Bench Certified
            </span>
            <button
              onClick={() => setShowOperatorDesk(!showOperatorDesk)}
              className="text-[11px] text-[#8c745c] hover:text-[#ffe0ba] underline transition font-mono"
            >
              {showOperatorDesk ? '← Return to Shop Bench' : 'Operator Portal'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Welcome (Warm, Nostalgic, Human) */}
      <section className="border-b-2 border-[#452b15] bg-gradient-to-b from-[#24170d] to-[#140e08] py-10 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#ffaa4f] bg-[#36210f] rounded-full border border-[#694220]">
            30 Years of Craft • Hand-Tested in Oregon
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#ffe8d1] tracking-tight">
            The Soul of a 90s PC Bench. Built for Modern Enthusiasts.
          </h2>
          <p className="max-w-2xl mx-auto text-[#c2b09b] text-sm sm:text-base leading-relaxed">
            Every component that leaves Don't bench has been hand-cleaned, stress-tested, and verified on real hardware. We connect directly to supplier inventories to pass live savings down to your build.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* OPERATOR DESK TOGGLE VIEW (Hidden by default so customer sees ONLY warm store) */}
        {showOperatorDesk && (
          <div className="bg-[#0c1424] border-2 border-blue-900 rounded-xl p-6 text-slate-100 space-y-4 font-mono text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" /> Operator Wall-Street Desk (Internal View)
              </span>
              <span className="text-emerald-400">Target Revenue: $4.3k/day • ROAS 3.2x</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
              <div className="bg-[#111c33] p-3 rounded border border-blue-900/40">
                <span className="text-[10px] text-slate-400 block">DAILY ORDERS</span>
                <span className="font-bold text-slate-100 text-base">43 Orders</span>
              </div>
              <div className="bg-[#111c33] p-3 rounded border border-blue-900/40">
                <span className="text-[10px] text-slate-400 block">CONVERSION</span>
                <span className="font-bold text-cyan-300 text-base">2.9%</span>
              </div>
              <div className="bg-[#111c33] p-3 rounded border border-blue-900/40">
                <span className="text-[10px] text-slate-400 block">MARGIN YIELD</span>
                <span className="font-bold text-emerald-400 text-base">+44.9%</span>
              </div>
              <div className="bg-[#111c33] p-3 rounded border border-blue-900/40">
                <span className="text-[10px] text-slate-400 block">PIPELINE</span>
                <span className="font-bold text-amber-400 text-base">4 Units Left</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. UNIFYING "SMART CONSULT" CTA BANNER */}
        <section className="bg-gradient-to-r from-[#291a0e] via-[#382312] to-[#291a0e] border-2 border-[#694220] rounded-xl p-6 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center space-x-2 text-[#ffaa4f]">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif font-bold text-lg text-[#ffe8d1]">
                Not sure which component fits your build?
              </h3>
            </div>
            <p className="text-xs text-[#c2b09b] leading-relaxed">
              Tell us your target budget — our bench algorithm instantly checks compatibility, live warehouse stock, and delivery timelines to match your exact build.
            </p>

            <form onSubmit={handleConsultMatch} className="flex flex-col sm:flex-row gap-3 pt-1">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-2.5 text-[#a68d74] text-sm">$</span>
                <input
                  type="number"
                  placeholder="Enter target budget (e.g. 500)"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  className="w-full bg-[#180f08] border border-[#52351b] rounded-lg py-2 pl-8 pr-4 text-xs text-[#ffe8d1] placeholder-[#7d6550] focus:outline-none focus:border-[#c87a32] font-mono"
                />
              </div>
              <button
                type="submit"
                className="bg-[#c87a32] hover:bg-[#e0893a] text-[#140e08] font-bold px-5 py-2 rounded-lg text-xs transition flex items-center justify-center gap-2 shadow-md"
              >
                <Search className="w-4 h-4" /> Match My Build
              </button>
            </form>

            {consultOutput && (
              <div className="bg-[#180f08] border border-[#52351b] p-3.5 rounded-lg text-xs text-[#ffe8d1] font-mono leading-relaxed flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-[#ffaa4f] shrink-0 mt-0.5" />
                <span>{consultOutput}</span>
              </div>
            )}
          </div>
        </section>

        {/* HARDWARE BENCH CATALOG GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#3d2715] pb-3">
            <h3 className="text-xl font-serif font-bold text-[#ffe8d1] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#ffaa4f]" /> Verified Bench Catalog
            </h3>
            <span className="text-xs text-[#a68d74]">Live Stock Confirmed</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {BENCH_CATALOG.map((comp) => (
              <div 
                key={comp.id}
                className="bg-[#1b120a] border-2 border-[#452b15] rounded-xl overflow-hidden shadow-xl hover:border-[#c87a32] transition flex flex-col justify-between"
              >
                <div>
                  {/* Card Header Tag */}
                  <div className="bg-[#26180c] px-4 py-2 border-b border-[#3d2715] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#ffaa4f] font-bold">
                      {comp.category}
                    </span>
                    <span className="text-[#a68d74] text-[11px]">
                      {comp.deliveryEstimate}
                    </span>
                  </div>

                  {/* Split Screen Card Body */}
                  <div className="grid grid-cols-1 sm:grid-cols-2">
                    
                    {/* Left Side: Photo & Craft Story */}
                    <div className="p-4 bg-[#140e08] border-b sm:border-b-0 sm:border-r border-[#332011] flex flex-col justify-between space-y-3">
                      <div>
                        <img 
                          src={comp.image} 
                          alt={comp.name} 
                          className="w-full h-36 object-cover rounded border border-[#3d2715] mb-3"
                        />
                        <h4 className="font-serif font-bold text-base text-[#ffe8d1] leading-tight mb-1">
                          {comp.name}
                        </h4>
                        <p className="text-xs text-[#b8a088] leading-relaxed">
                          {comp.craftStory}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#291a0e] space-y-1">
                        <span className="text-[11px] text-[#8c745c] block font-mono">
                          {comp.stockNote}
                        </span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs text-[#a68d74]">Bench Price:</span>
                          <span className="text-2xl font-serif font-bold text-[#ffaa4f]">
                            ${comp.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Component Spec Sheet */}
                    <div className="p-4 bg-[#181008]/80 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[11px] font-mono text-[#a68d74] uppercase tracking-wider block mb-2 border-b border-[#332011] pb-1">
                          Technical Specs
                        </span>
                        
                        <div className="space-y-2 text-xs font-mono">
                          <div className="flex justify-between bg-[#110b06] p-2 rounded border border-[#2b1b0e]">
                            <span className="text-[#8c745c]">Interface / Bus:</span>
                            <span className="text-[#ffe8d1] font-bold">{comp.specs.busOrSocket}</span>
                          </div>
                          <div className="flex justify-between bg-[#110b06] p-2 rounded border border-[#2b1b0e]">
                            <span className="text-[#8c745c]">Clock Speed:</span>
                            <span className="text-emerald-400 font-bold">{comp.specs.speed}</span>
                          </div>
                          <div className="flex justify-between bg-[#110b06] p-2 rounded border border-[#2b1b0e]">
                            <span className="text-[#8c745c]">Capacity / RAM:</span>
                            <span className="text-[#ffaa4f] font-bold">{comp.specs.capacity}</span>
                          </div>
                          <div className="flex justify-between bg-[#110b06] p-2 rounded border border-[#2b1b0e]">
                            <span className="text-[#8c745c]">Thermal / TDP:</span>
                            <span className="text-amber-400 font-bold">{comp.specs.thermalOrTdp}</span>
                          </div>
                        </div>
                      </div>

                      {/* Humanized Value Note */}
                      <div className="p-2.5 bg-[#21140a] rounded border border-[#422915] text-[11px] text-[#c2b09b] leading-tight">
                        <span className="text-[#ffaa4f] font-bold block mb-0.5">Value Note:</span>
                        {comp.marketSavingNote}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 bg-[#24170d] border-t border-[#452b15] flex items-center justify-between">
                  <span className="text-[11px] text-[#a68d74] font-mono flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#ffaa4f]" /> Pre-checked warehouse stock
                  </span>
                  <button
                    onClick={() => handleCheckout(comp)}
                    disabled={loadingId === comp.id}
                    className="bg-[#c87a32] hover:bg-[#e0893a] disabled:opacity-50 text-[#140e08] font-bold px-5 py-2 rounded text-xs transition flex items-center gap-2 shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {loadingId === comp.id ? 'Processing...' : 'Order Component'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* HERITAGE FOOTER & SUBTLE ANALYTICS TICKER */}
      <footer className="border-t-2 border-[#5c391c] bg-[#1a110a] py-4 px-6 mt-12 text-xs text-[#8c745c]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-serif text-[#ffe8d1]">Den Silicon Lab • Oregon Repair Bench</span>
          </div>

          <div className="font-mono text-[11px] text-[#a68d74] text-center">
            <span>30 Years Legacy</span>
            <span className="mx-2 text-[#4d341d]">|</span>
            <span>43 Orders Today</span>
            <span className="mx-2 text-[#4d341d]">|</span>
            <span className="text-[#ffaa4f]">Live Warehouse Stock Pre-Verified</span>
          </div>

          <span>© 2026 Den Silicon Lab</span>
        </div>
      </footer>
    </div>
  );
}

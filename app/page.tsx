"use client";

import React, { useState } from 'react';
import { ShoppingBag, Cpu, ShieldCheck, Zap } from 'lucide-react';

const SAMPLE_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Vintage Sound Blaster 16 ISA Card',
    category: 'Audio / Expansion',
    price: 85.00,
    description: 'Authentic 1994 Sound Blaster 16 ISA sound card, fully tested and recapped for retro gaming rigs.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_2',
    name: 'Custom Pentium III Slot 1 Retro Rig',
    category: 'Complete Desktops',
    price: 450.00,
    description: 'Custom built vintage gaming PC with 800MHz Pentium III, 512MB RAM, Voodoo3 3000, and MS-DOS 6.22 / Windows 98 Dual Boot.',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'prod_3',
    name: '3dfx Voodoo2 12MB AGP/PCI Graphics Accelerator',
    category: 'Graphics Cards',
    price: 165.00,
    description: 'Original 3dfx Glide 3D accelerator, benchmarks passed cleanly in Den Silicon Lab diagnostics.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60'
  }
];

export default function DenSiliconLabHome() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCheckout = async (product: typeof SAMPLE_PRODUCTS[0]) => {
    setLoadingId(product.id);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
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
      alert('Error initiating checkout. Check environment keys.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Cpu className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-xl font-bold tracking-wider text-slate-50 uppercase">Den Silicon Lab</h1>
              <p className="text-xs text-slate-400">Vintage PC Hardware & Custom Computing Setups</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <span className="text-slate-400 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Lab Verified</span>
            <span className="text-slate-400 flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> Fast Shipping</span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 rounded-full border border-cyan-800">
            Labor of Love • Custom Retro Hardware
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl">
            Precision Restored Computing
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base">
            Hand-tested vintage components, restored ISA/PCI sound and graphics cards, and custom computing setups built by Don with passion and care.
          </p>
        </div>
      </section>

      {/* Store Catalog */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SAMPLE_PRODUCTS.map((prod) => (
            <div key={prod.id} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="h-48 bg-slate-800 overflow-hidden relative">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 bg-slate-950/80 text-xs px-2.5 py-1 rounded text-cyan-300 font-mono">
                    {prod.category}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-100">{prod.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{prod.description}</p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-slate-800/50 mt-4 flex items-center justify-between">
                <span className="text-2xl font-bold font-mono text-cyan-400">${prod.price.toFixed(2)}</span>
                <button
                  onClick={() => handleCheckout(prod)}
                  disabled={loadingId === prod.id}
                  className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-semibold px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {loadingId === prod.id ? 'Loading...' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Den Silicon Lab • Powered by Next.js & Stripe Payments</p>
      </footer>
    </div>
  );
}

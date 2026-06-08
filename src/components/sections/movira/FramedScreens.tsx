"use client";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  Truck,
  Plus,
  ArrowRight,
  Sparkles,
  MapPin,
  Search,
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart3,
  Inbox,
  Home,
  History,
  Wallet,
  User,
  Wifi,
  BatteryFull,
  Signal,
} from "lucide-react";

function FittedScreen({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setScale(el.clientWidth / w);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [w]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-white">
      <div
        style={{
          width: w,
          height: h,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          opacity: scale ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const INK = "#0A0A0A";

const STATUS_PILL = "bg-gray-100 text-gray-600 border-gray-200";

function Offer({
  ruta,
  km,
  vehiculo,
  hora,
  ganancia,
}: {
  ruta: [string, string];
  km: string;
  vehiculo: string;
  hora: string;
  ganancia: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-gray-200 bg-white p-3.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-gray-500">
          <Truck size={14} /> {vehiculo}
        </span>
        <span className="text-[12px] text-gray-400">{hora}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[16px] font-bold text-gray-900">{ruta[0]}</span>
        <ArrowRight size={14} className="text-gray-400" />
        <span className="text-[16px] font-bold text-gray-900">{ruta[1]}</span>
        <span className="ml-auto rounded-md bg-gray-100 px-2 py-0.5 text-[11px] text-gray-500">
          {km}
        </span>
      </div>
      <div className="flex items-end justify-between pt-1">
        <div>
          <p className="text-[11px] text-gray-400">Tu ganancia</p>
          <p className="text-[18px] font-bold text-gray-900">{ganancia}</p>
        </div>
        <div className="flex gap-2">
          <span className="rounded-lg border border-gray-200 px-3 py-2 text-[12px] font-semibold text-gray-600">
            Ver
          </span>
          <span
            className="rounded-lg px-3 py-2 text-[12px] font-bold text-white"
            style={{ background: INK }}
          >
            Postularme
          </span>
        </div>
      </div>
    </div>
  );
}

export function DriverScreen() {
  return (
    <div className="flex h-[800px] w-[360px] flex-col bg-[#F9FAFB] font-sans">
      <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[12px] font-semibold text-gray-900">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <Signal size={13} /> <Wifi size={13} /> <BatteryFull size={15} />
        </span>
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-3">
        <span className="text-[18px] font-bold text-gray-900">Hola, Carlos 👋</span>
        <span className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[12px] font-semibold text-gray-600">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-900" /> Disponible
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 py-4">
        <p className="text-[13px] font-bold uppercase tracking-wide text-gray-400">
          Despachos disponibles
        </p>
        <Offer
          ruta={["Manizales", "Pereira"]}
          km="58 km"
          vehiculo="Camioneta"
          hora="Hoy 2:30 pm"
          ganancia="$ 142.000"
        />
        <Offer
          ruta={["Manizales", "Chinchiná"]}
          km="22 km"
          vehiculo="Furgón"
          hora="Hoy 4:00 pm"
          ganancia="$ 78.000"
        />
        <Offer
          ruta={["La Enea", "Centro"]}
          km="9 km"
          vehiculo="Moto"
          hora="Mañana 8:00 am"
          ganancia="$ 21.000"
        />
      </div>
      <div className="flex items-center justify-around border-t border-gray-200 bg-white px-4 py-2.5">
        {[
          { icon: Home, l: "Inicio", on: true },
          { icon: History, l: "Historial", on: false },
          { icon: Wallet, l: "Ingresos", on: false },
          { icon: User, l: "Perfil", on: false },
        ].map(({ icon: Icon, l, on }) => (
          <div
            key={l}
            className="flex flex-col items-center gap-1"
            style={{ color: on ? INK : "#9CA3AF" }}
          >
            <Icon size={20} />
            <span className="text-[11px] font-medium">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar({
  items,
}: {
  items: { icon: typeof Home; label: string; active?: boolean }[];
}) {
  return (
    <div className="flex w-[230px] shrink-0 flex-col border-r border-gray-200 bg-white px-4 py-5">
      <div className="mb-7 px-2 text-[22px] font-bold tracking-tight" style={{ color: INK }}>
        movira
      </div>
      <nav className="flex flex-col gap-1">
        {items.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium"
            style={{
              background: active ? "rgba(0,0,0,0.05)" : "transparent",
              color: active ? INK : "#6B7280",
            }}
          >
            <Icon size={17} /> {label}
          </div>
        ))}
      </nav>
    </div>
  );
}

export function DashboardScreen() {
  const stats = [
    { v: "24", l: "Total órdenes" },
    { v: "5", l: "Activas" },
    { v: "8", l: "Asignadas" },
    { v: "9", l: "Completadas" },
    { v: "2", l: "Canceladas" },
    { v: "$2.4M", l: "Ingresos", ink: true },
  ];
  const rows = [
    { t: "Despacho muebles oficina", o: "Cra 23 #25-10", d: "Cable Plaza", v: "Camioneta", p: "$ 142.000", s: "Asignada" },
    { t: "Repuestos industriales", o: "La Enea", d: "Chinchiná", v: "Furgón", p: "$ 98.000", s: "En tránsito" },
    { t: "Cajas e-commerce", o: "Centro", d: "Villamaría", v: "Moto", p: "$ 21.000", s: "Entregada" },
    { t: "Carga refrigerada", o: "Bodega Norte", d: "Pereira", v: "Camión", p: "$ 310.000", s: "Pendiente" },
  ];
  return (
    <FittedScreen w={1200} h={700}>
      <div className="flex h-[700px] w-[1200px] bg-[#F9FAFB] font-sans">
        <Sidebar
          items={[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: ClipboardList, label: "Registros" },
            { icon: Plus, label: "Nueva orden" },
            { icon: Truck, label: "Conductores" },
            { icon: BarChart3, label: "Métricas" },
          ]}
        />
        <div className="flex flex-1 flex-col gap-6 overflow-hidden p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[26px] font-bold text-gray-900">Dashboard</h1>
              <p className="text-[14px] text-gray-500">Logística Andina S.A.S</p>
            </div>
            <span
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-[14px] font-bold text-white"
              style={{ background: INK }}
            >
              <Plus size={16} /> Nueva orden
            </span>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {stats.map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-gray-200 bg-white p-4"
                style={s.ink ? { background: INK, borderColor: INK } : undefined}
              >
                <p className={`text-[22px] font-bold ${s.ink ? "text-white" : "text-gray-900"}`}>
                  {s.v}
                </p>
                <p className={`mt-1 text-[12px] ${s.ink ? "text-white/80" : "text-gray-500"}`}>
                  {s.l}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
              <p className="text-[15px] font-bold text-gray-900">Actividad reciente</p>
              <span className="text-[13px] font-medium" style={{ color: INK }}>
                Ver todas →
              </span>
            </div>
            <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-6 px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <span>Orden</span>
              <span>Vehículo</span>
              <span className="text-right">Precio</span>
              <span>Estado</span>
            </div>
            {rows.map((r) => (
              <div
                key={r.t}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-6 border-t border-gray-50 px-5 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-gray-900">{r.t}</p>
                  <p className="flex items-center gap-1 text-[12px] text-gray-400">
                    <MapPin size={11} /> {r.o} <ArrowRight size={10} /> {r.d}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-[13px] text-gray-500">
                  <Truck size={13} /> {r.v}
                </span>
                <span className="text-right text-[14px] font-bold" style={{ color: INK }}>
                  {r.p}
                </span>
                <span className={`rounded-full border px-2.5 py-1 text-[12px] font-semibold ${STATUS_PILL}`}>
                  {r.s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FittedScreen>
  );
}

export function WebScreen() {
  return (
    <FittedScreen w={1200} h={700}>
      <div className="flex h-[700px] w-[1200px] flex-col bg-white font-sans">
        <header className="flex items-center justify-between border-b border-gray-100 px-12 py-5">
          <span className="text-[24px] font-bold tracking-tight" style={{ color: INK }}>
            movira
          </span>
          <nav className="flex items-center gap-7 text-[14px] font-medium text-gray-600">
            <span>Inicio</span>
            <span>Empresas</span>
            <span>Transportistas</span>
            <span>Nosotros</span>
            <span>Contacto</span>
          </nav>
          <span
            className="rounded-lg px-4 py-2 text-[14px] font-bold text-white"
            style={{ background: INK }}
          >
            Ingresar
          </span>
        </header>
        <div className="flex flex-1 items-center gap-12 px-12">
          <div className="flex-1">
            <span className="inline-block rounded-full bg-black/5 px-3 py-1 text-[13px] font-semibold" style={{ color: INK }}>
              Logística inteligente · Colombia
            </span>
            <h1 className="mt-5 text-[52px] font-bold leading-[1.05] tracking-tight text-gray-900">
              La plataforma logística de <span style={{ color: INK }}>Colombia</span>
            </h1>
            <p className="mt-5 max-w-[440px] text-[17px] leading-relaxed text-gray-500">
              Conecta tu operación con conductores verificados. Asigna cargas, rastrea
              envíos y gestiona entregas en tiempo real desde un solo lugar.
            </p>
            <div className="mt-7 flex gap-3">
              <span className="rounded-xl px-6 py-3.5 text-[15px] font-bold text-white" style={{ background: INK }}>
                Cotiza tu envío
              </span>
              <span className="rounded-xl border border-gray-300 px-6 py-3.5 text-[15px] font-bold text-gray-700">
                Ver demo
              </span>
            </div>
            <div className="mt-9 flex gap-9">
              {[
                ["+1.200", "envíos / mes"],
                ["4.8★", "47 reseñas"],
                ["6", "ciudades"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="text-[24px] font-bold text-gray-900">{n}</p>
                  <p className="text-[13px] text-gray-400">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-[420px] w-[400px] shrink-0 flex-col gap-3 rounded-3xl border border-gray-200 bg-[#F9FAFB] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
              <Truck size={15} style={{ color: INK }} /> Cotiza en segundos
            </div>
            {["Origen", "Destino"].map((l) => (
              <div key={l} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                <p className="text-[11px] text-gray-400">{l}</p>
                <p className="text-[14px] font-semibold text-gray-700">
                  {l === "Origen" ? "Manizales, Caldas" : "Pereira, Risaralda"}
                </p>
              </div>
            ))}
            <div className="mt-auto rounded-2xl p-4 text-white" style={{ background: INK }}>
              <p className="text-[13px] text-white/70">Precio estimado</p>
              <p className="text-[30px] font-bold">$ 142.000</p>
            </div>
          </div>
        </div>
      </div>
    </FittedScreen>
  );
}

export function IaScreen() {
  const factors = [
    { n: "Clima", f: "× 1.05", d: "Lluvia ligera en Manizales" },
    { n: "Demanda", f: "× 1.12", d: "Pocos transportistas disponibles" },
    { n: "Hora", f: "× 1.00", d: "Horario estándar" },
    { n: "Análisis de mercado (IA)", f: "× 0.96", d: "Ruta frecuente, carga estándar" },
  ];
  return (
    <FittedScreen w={1200} h={700}>
      <div className="flex h-[700px] w-[1200px] bg-[#F9FAFB] font-sans text-gray-900">
        <div className="flex w-[420px] shrink-0 flex-col gap-4 border-r border-gray-200 bg-white p-8">
          <div className="flex items-center gap-2 text-[14px] font-bold text-gray-500">
            <Sparkles size={16} className="text-gray-900" /> Cotizador con IA
          </div>
          {[
            ["Origen", "Cra 23 #25-10, Manizales"],
            ["Destino", "Av. 30 de Agosto, Pereira"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-[11px] text-gray-400">{l}</p>
              <p className="flex items-center gap-1.5 text-[14px] font-medium text-gray-800">
                <MapPin size={13} className="text-gray-400" /> {v}
              </p>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-[11px] text-gray-400">Distancia</p>
              <p className="text-[16px] font-bold text-gray-900">58 km</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
              <p className="text-[11px] text-gray-400">Vehículo</p>
              <p className="text-[16px] font-bold text-gray-900">Camioneta</p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-5 p-8">
          <div className="rounded-2xl p-6 text-white" style={{ background: INK }}>
            <p className="text-[14px] text-white/70">Precio dinámico estimado</p>
            <p className="text-[48px] font-bold leading-none">$ 48.500</p>
            <p className="mt-2 text-[13px] text-white/70">
              Base $ 46.000 · multiplicador 1.05 · confianza 85%
            </p>
          </div>
          <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5">
            <p className="mb-3 text-[13px] font-bold uppercase tracking-wider text-gray-400">
              Factores aplicados
            </p>
            <div className="flex flex-col gap-2.5">
              {factors.map((f) => (
                <div key={f.n} className="flex items-center justify-between border-b border-gray-100 pb-2.5">
                  <div>
                    <p className="text-[15px] font-semibold text-gray-900">{f.n}</p>
                    <p className="text-[12px] text-gray-400">{f.d}</p>
                  </div>
                  <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-[15px] font-bold tabular-nums text-gray-700">
                    {f.f}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FittedScreen>
  );
}

export function DespachosScreen() {
  return (
    <FittedScreen w={1200} h={700}>
      <div className="flex h-[700px] w-[1200px] flex-col bg-white font-sans">
        <div className="px-12 pt-9">
          <h1 className="text-[32px] font-bold tracking-tight text-gray-900">
            Solicita tu despacho
          </h1>
          <p className="mt-1.5 text-[15px] text-gray-500">
            Cuéntanos qué necesitas mover en Manizales. Sin registros previos.
          </p>
        </div>
        <div className="flex flex-1 gap-8 px-12 py-7">
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex items-center">
              {["Ruta", "Vehículo", "Detalles", "Enviar"].map((s, i) => (
                <div key={s} className="flex flex-1 items-center last:flex-none">
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-bold"
                      style={{
                        background: i <= 1 ? INK : "#E5E7EB",
                        color: i <= 1 ? "#fff" : "#9CA3AF",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: i <= 1 ? INK : "#9CA3AF" }}
                    >
                      {s}
                    </span>
                  </div>
                  {i < 3 && (
                    <span
                      className="mx-3 h-0.5 flex-1"
                      style={{ background: i < 1 ? INK : "#E5E7EB" }}
                    />
                  )}
                </div>
              ))}
            </div>
            {[
              ["Punto de recogida", "Cra 23 #25-10, Manizales"],
              ["Punto de entrega", "Barrio La Enea, Manizales"],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl border border-gray-200 px-4 py-3.5">
                <p className="text-[12px] text-gray-400">{l}</p>
                <p className="flex items-center gap-2 text-[15px] font-medium text-gray-800">
                  <MapPin size={15} className="text-gray-400" /> {v}
                </p>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 px-4 py-3.5">
                <p className="text-[12px] text-gray-400">Vehículo</p>
                <p className="text-[15px] font-medium text-gray-800">Camioneta</p>
              </div>
              <div className="rounded-xl border border-gray-200 px-4 py-3.5">
                <p className="text-[12px] text-gray-400">Hora de recogida</p>
                <p className="text-[15px] font-medium text-gray-800">Hoy · 2:30 pm</p>
              </div>
            </div>
          </div>
          <div className="flex w-[380px] shrink-0 flex-col gap-4">
            <div
              className="relative flex-1 overflow-hidden rounded-2xl border border-gray-200"
              style={{ background: "#F4F4F5" }}
            >
              <div className="absolute left-6 top-8 h-3 w-3 rounded-full ring-4 ring-white" style={{ background: INK }} />
              <div className="absolute bottom-10 right-8 h-3 w-3 rounded-full bg-neutral-400 ring-4 ring-white" />
              <svg className="absolute inset-0 h-full w-full">
                <path d="M 30 40 C 140 120, 200 180, 320 240" fill="none" stroke={INK} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
              </svg>
              <span className="absolute left-4 top-3 rounded-md bg-white/80 px-2 py-1 text-[11px] font-semibold text-gray-500">
                Manizales
              </span>
            </div>
            <div className="rounded-2xl p-5 text-white" style={{ background: INK }}>
              <p className="text-[13px] text-white/70">Precio estimado</p>
              <p className="text-[34px] font-bold leading-tight">$ 35.000</p>
              <span className="mt-2 inline-block rounded-lg bg-white px-4 py-2 text-[13px] font-bold" style={{ color: INK }}>
                Continuar →
              </span>
            </div>
          </div>
        </div>
      </div>
    </FittedScreen>
  );
}

export function AdminScreen() {
  const tabs = [
    { l: "Todas", n: "24", active: false },
    { l: "Por revisar", n: "5", active: true },
    { l: "Aprobadas", n: "14", active: false },
    { l: "Rechazadas", n: "3", active: false },
  ];
  const rows = [
    { t: "Muebles oficina", id: "a1f9b2c4", v: "Camioneta", cli: "Andrea Gómez", ruta: "Cra 23 → Cable Plaza", est: "$ 142.000", s: "Por revisar" },
    { t: "Repuestos moto", id: "7c2e10aa", v: "Furgón", cli: "Distribuidora JR", ruta: "La Enea → Chinchiná", est: "$ 98.000", s: "Por revisar" },
    { t: "Cajas e-commerce", id: "33b8f0d1", v: "Moto", cli: "TiendaOnline", ruta: "Centro → Villamaría", est: "$ 21.000", s: "Aprobada" },
    { t: "Carga refrigerada", id: "9ad4c6e2", v: "Camión", cli: "Frutas del Eje", ruta: "Bodega → Pereira", est: "$ 310.000", s: "Por revisar" },
    { t: "Material construcción", id: "1be7704f", v: "Tractocamión", cli: "Constructora Andes", ruta: "Manizales → Cali", est: "$ 980.000", s: "Rechazada" },
  ];
  return (
    <FittedScreen w={1200} h={700}>
      <div className="flex h-[700px] w-[1200px] bg-[#F9FAFB] font-sans">
        <Sidebar
          items={[
            { icon: Inbox, label: "Solicitudes", active: true },
            { icon: ClipboardList, label: "Órdenes" },
            { icon: Users, label: "Usuarios" },
            { icon: BarChart3, label: "Métricas" },
          ]}
        />
        <div className="flex flex-1 flex-col gap-5 overflow-hidden p-8">
          <div>
            <h1 className="text-[24px] font-bold text-gray-900">Solicitudes</h1>
            <p className="text-[14px] text-gray-500">Solicitudes públicas de despacho · despachos.movira.com.co</p>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {tabs.map((t) => (
              <div
                key={t.l}
                className="rounded-xl border bg-white px-4 py-3"
                style={{
                  borderColor: t.active ? INK : "#E5E7EB",
                  background: t.active ? "rgba(0,0,0,0.05)" : "#fff",
                }}
              >
                <p className="text-[24px] font-bold" style={{ color: t.active ? INK : "#111827" }}>
                  {t.n}
                </p>
                <p className="text-[12px] text-gray-500">{t.l}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
            <Search size={15} className="text-gray-400" />
            <span className="text-[13px] text-gray-400">Buscar por ID, nombre, teléfono, dirección o carga…</span>
          </div>
          <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="grid grid-cols-[1.4fr_1fr_1.2fr_auto_auto] gap-x-5 border-b border-gray-100 bg-gray-50/60 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <span>Solicitud</span>
              <span>Cliente</span>
              <span>Ruta</span>
              <span className="text-right">Estimado</span>
              <span>Estado</span>
            </div>
            {rows.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[1.4fr_1fr_1.2fr_auto_auto] items-center gap-x-5 border-b border-gray-50 px-5 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-gray-900">{r.t}</p>
                  <p className="text-[12px] text-gray-400">#{r.id} · {r.v}</p>
                </div>
                <span className="truncate text-[13px] text-gray-600">{r.cli}</span>
                <span className="truncate text-[13px] text-gray-500">{r.ruta}</span>
                <span className="text-right text-[14px] font-semibold text-gray-700">{r.est}</span>
                <span className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${STATUS_PILL}`}>
                  {r.s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FittedScreen>
  );
}

export type SafariScreenKey = "dashboard" | "web" | "ia" | "despachos" | "admin";

export const SAFARI_SCREENS: Record<SafariScreenKey, () => ReactNode> = {
  dashboard: DashboardScreen,
  web: WebScreen,
  ia: IaScreen,
  despachos: DespachosScreen,
  admin: AdminScreen,
};

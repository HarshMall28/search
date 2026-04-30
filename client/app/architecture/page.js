import ArchFlow from '../components/architecture/ArchFlow'

export default function ArchitecturePage() {
  return (
    <main className="pt-[90px] min-h-screen" style={{ background: 'var(--bg)' }}>
      <div
        className="max-w-[1320px] mx-auto pb-20"
        style={{ padding: '0 clamp(18px,3vw,36px) 80px' }}
      >
        <div className="mt-[14px] mb-[38px] text-center">
          <h1
            className="m-0 mb-[10px] font-bold"
            style={{ fontSize: '42px', letterSpacing: '-0.025em' }}
          >
            How <span style={{ color: 'var(--blue-2)' }}>SenseiSearch</span> Works
          </h1>
          <p className="m-0 text-[16px]" style={{ color: 'var(--ink-dim)' }}>
            Click through the 6-step pipeline to see exactly what happens under the hood.
          </p>
        </div>

        <ArchFlow />
      </div>
    </main>
  )
}

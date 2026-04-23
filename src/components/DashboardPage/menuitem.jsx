export default function MenuItem({ text, active, icon: Icon }) {
  return (
    <div
      className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg cursor-pointer ${
        active ? "bg-white text-green-600 font-bold" : "hover:bg-white/20"
      }`}
    >
      {Icon && <Icon size={18}/>}
      <span>{text}</span>
    </div>
  )
}
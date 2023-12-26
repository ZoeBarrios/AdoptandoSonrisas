export default function ItemUser({ label, value }) {
  return (
    <p className="text-xl">
      <span className="font-bold">{label}:</span> {value}
    </p>
  );
}

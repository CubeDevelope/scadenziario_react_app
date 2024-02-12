import "./list.tile.css";

export function ListTile({ title = "Titolo", leading, trailing, onTap }) {
  return (
    <div className="listTile" onClick={onTap}>
      {leading} {title}
    </div>
  );
}

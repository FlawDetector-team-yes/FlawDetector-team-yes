import "./button.css";
type TButton = React.ComponentPropsWithoutRef<"button">;
export default function Button({ className, children }: TButton) {
  return (
    <>
      <button className={`${className}`}>{children}</button>
    </>
  );
}

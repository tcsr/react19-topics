/**
 * PROPS
 * -----
 * Props ("properties") are read-only inputs passed from a parent component to a
 * child. They flow one way (top-down / unidirectional). A child must never
 * mutate its props — treat them as immutable. In TypeScript you type props with
 * an interface or type alias.
 *
 * `children` is a special prop containing whatever JSX is nested inside the tag.
 */

interface UserCardProps {
  name: string;
  age?: number; // optional prop
  children?: React.ReactNode; // nested content
}

function UserCard({ name, age = 0, children }: UserCardProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 8, borderRadius: 6 }}>
      <strong>{name}</strong> {age > 0 && <span>({age})</span>}
      <div>{children}</div>
    </div>
  );
}

export function Props() {
  return (
    <UserCard name="Ada" age={36}>
      <em>Passed as children</em>
    </UserCard>
  );
}

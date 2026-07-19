export function baseUrl(): string {
  const base = import.meta.env.BASE_URL;
  return base === "/" ? "" : base.replace(/\/$/, "");
}

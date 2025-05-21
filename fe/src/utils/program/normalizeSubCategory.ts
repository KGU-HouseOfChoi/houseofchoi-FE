export function normalizeSubCategory(value: unknown): "실내" | "실외" | null {
  const str = typeof value === "string" ? value : String(value);

  const trimmed = str.trim();

  if (trimmed === "실내") return "실내";
  if (trimmed === "실외") return "실외";

  return null;
}
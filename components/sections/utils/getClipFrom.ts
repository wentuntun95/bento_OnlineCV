export const getClipFrom = (sourceRect: DOMRect | null) => {
  if (!sourceRect || typeof window === "undefined")
    return "inset(0px 0px 0px 0px)";
  const top = Math.round(sourceRect.top);
  const right = Math.round(window.innerWidth - sourceRect.right);
  const bottom = Math.round(window.innerHeight - sourceRect.bottom);
  const left = Math.round(sourceRect.left);
  return `inset(${top}px ${right}px ${bottom}px ${left}px)`;
};

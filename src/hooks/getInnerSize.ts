export const getInnerHeight = (nodeEl: HTMLElement): number => {
  const computed = getComputedStyle(nodeEl);
  const padding =
    parseInt(computed.paddingTop, 10) + parseInt(computed.paddingBottom, 10);

  return nodeEl.clientHeight - padding;
};

export const getInnerWidth = (nodeEl: HTMLElement): number => {
  const computed = getComputedStyle(nodeEl);
  const padding =
    parseInt(computed.paddingLeft, 10) + parseInt(computed.paddingRight, 10);

  return nodeEl.clientWidth - padding;
};

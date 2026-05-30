const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export const generateRewardCode = (seed = Date.now()) => {
  let value = Math.abs(seed);
  let suffix = "";

  for (let index = 0; index < 6; index += 1) {
    value = (value * 9301 + 49297) % 233280;
    suffix += CODE_CHARS[value % CODE_CHARS.length];
  }

  return `GREEN-2026-${suffix}`;
};

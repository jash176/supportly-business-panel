interface FlagIconProps {
  countryCode: string;
  className?: string;
}

const countryToFlag = (isoCode: string): string => {
  return typeof String.fromCodePoint !== "undefined"
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
};

const FlagIcon: React.FC<FlagIconProps> = ({ countryCode, className = "" }) => {
  return (
    <span className={className} role="img" aria-label={`Flag: ${countryCode}`}>
      {countryToFlag(countryCode)}
    </span>
  );
};

export default FlagIcon;

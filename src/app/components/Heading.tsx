"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  color?: string;
}

const Heading = ({ title, subtitle, center, color }: HeadingProps) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div style={{ color: color || "black" }} className="text-2xl font-bold">
        {title}
      </div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;

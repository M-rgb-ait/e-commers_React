import { Headset, RefreshCw, ShieldCheck, Truck } from "lucide-react";

export default function FeaturesSection() {
  const featureItems = [
    {
      icon: <Truck strokeWidth={0.9} className="size-10" />,
      title: "Fast Delivery",
      description: "Free shipping on orders over $120",
    },
    {
      icon: <RefreshCw strokeWidth={0.9} className="size-10" />,
      title: "Easy Returns",
      description: "Hassle-free returns within 7 days",
    },
    {
      icon: <ShieldCheck strokeWidth={0.9} className="size-10" />,
      title: "Secure Payment",
      description: "100% secure payment guarantee",
    },
    {
      icon: <Headset strokeWidth={0.9} className="size-10" />,
      title: "24/7 Support",
      description: "We are always here to help you",
    },
  ];

  return (
    <section className="mx-auto my-10 grid w-full grid-cols-2 justify-items-center gap-y-3 rounded-2xl bg-red-50 py-10 dark:bg-zinc-700 md:grid-cols-4">
      {featureItems.map((item, index) => (
        <div className="flex flex-wrap justify-center gap-4" key={index}>
          {/* Icon */}
          <div className="flex size-[65px] items-center justify-center rounded-full bg-red-600 text-white dark:bg-softpink-200 dark:text-zinc-700">
            {item.icon}
          </div>

          {/* Title and description */}
          <div className="flex flex-col justify-center gap-[5px] lg:justify-start">
            <h4 className="text-center text-xl font-semibold dark:text-pink-200 lg:text-start">
              {item.title}
            </h4>

            <p className="text-sm font-normal text-zinc-700 dark:text-zinc-300">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

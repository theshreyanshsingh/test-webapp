import Image from "next/image";
import React from "react";
import topics from "../assets/topics.png";

const TopicItem = ({ number, title, description }) => (
  <div className="flex gap-2 h-full">
    <div className="min-w-7 min-h-7 max-w-7 max-h-7 text-sm bg-[#4A4F53] flex justify-center items-center text-white rounded-full">
      {number}
    </div>
    <div className="flex flex-col gap-3">
      <div className="font-semibold text-lg">{title}</div>
      <div>{description}</div>
    </div>
  </div>
);

const Page = () => {
  const topicsData = [
    {
      number: 1,
      title: "Create Engaging Topics (150+ Members)",
      description:
        "Once your community reaches 150 members, unlock the power to create topics! Share your expertise, spark discussions, and build a loyal following.",
    },
    {
      number: 2,
      title: "Free or Paid Topics",
      description:
        "Choose the format that best suits your content. Offer free topics to build engagement, or create exclusive paid topics (available after unlocking topic creation) to generate income.",
    },
    {
      number: 3,
      title: "Withdraw Your Earnings",
      description:
        "Seamlessly connect your bank account and withdraw your hard-earned income from store sales, ad revenue, and paid topics (once available).",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 sm:h-screen h-full w-full">
      <div className="h-full pn:max-sm:order-2 flex flex-grow flex-col">
        <div className="text-2xl h-[7vh] flex items-center pt-8 px-4 sm:px-16 font-bold">
          Topics:
        </div>
        <div className="flex flex-col justify-center flex-grow mt-12 h-[75vh] sm:h-[80vh]">
          <div className="flex flex-col gap-6 px-4 sm:px-16 flex-grow h-full">
            {topicsData.map(({ number, title, description }) => (
              <TopicItem
                key={number}
                number={number}
                title={title}
                description={description}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#363636] pn:max-sm:order-1 min-h-[450px] flex justify-center items-center">
        <Image
          src={topics}
          className="max-w-[320px] sm:max-w-[450px]"
          alt="Topics Illustration"
        />
      </div>
    </div>
  );
};

export default Page;


import Layout from "@/components/layout/Layout";
import TimelineEvent from "@/components/memorial/TimelineEvent";

const TimelinePage = () => {
  // Sample timeline data - in a real app, this would come from an API or database
  const timelineEvents = [
    {
      date: "July 15, 1958",
      title: "Birth",
      description: "Stephen Mureithi was born in Nyeri County to James and Mary Mureithi."
    },
    {
      date: "1976",
      title: "High School Graduation",
      description: "Graduated from Alliance High School with honors in mathematics and science."
    },
    {
      date: "1980",
      title: "University Graduation",
      description: "Earned a Bachelor's degree in Engineering from the University of Nairobi."
    },
    {
      date: "1985",
      title: "Marriage",
      description: "Married his beloved wife, Jane Wambui, in a beautiful ceremony in Nairobi."
    },
    {
      date: "1986",
      title: "First Child",
      description: "Welcomed his first child, Daniel Mureithi, into the world."
    },
    {
      date: "1988",
      title: "Second Child",
      description: "Welcomed his daughter, Sarah Mureithi, into the family."
    },
    {
      date: "1995",
      title: "Career Achievement",
      description: "Promoted to Chief Engineer at Kenya Power, a position he held with distinction for over a decade."
    },
    {
      date: "2005",
      title: "Community Leadership",
      description: "Founded the Mureithi Education Foundation to support bright students from disadvantaged backgrounds."
    },
    {
      date: "2018",
      title: "Retirement",
      description: "Retired after a distinguished 35-year career, celebrated by colleagues and friends."
    },
    {
      date: "2020",
      title: "First Grandchild",
      description: "Welcomed his first grandchild, James, son of Daniel and his wife Ruth."
    },
    {
      date: "March 5, 2023",
      title: "Passing",
      description: "Peacefully passed away surrounded by his loving family."
    }
  ];

  return (
    <Layout>
      <div className="memorial-container py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Life Timeline</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Celebrating the journey and significant moments in Stephen's life.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={index}
              date={event.date}
              title={event.title}
              description={event.description}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TimelinePage;

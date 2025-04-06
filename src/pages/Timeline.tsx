
import Layout from "@/components/layout/Layout";
import TimelineEvent from "@/components/memorial/TimelineEvent";

const TimelinePage = () => {
  // Timeline data based on the About page information
  const timelineEvents = [
    {
      date: "1974",
      title: "Birth",
      description: "Stephen was born in Mwea Location, Kirinyaga County to James Mburia and Cecilia Wamaitha."
    },
    {
      date: "1980s",
      title: "Early Childhood",
      description: "Stephen grew up as an obedient son who assisted his parents with family chores."
    },
    {
      date: "1980s",
      title: "Primary Education",
      description: "Stephen began his early education at Thima Primary School in Kirinyaga County."
    },
    {
      date: "Early 1990s",
      title: "Education",
      description: "After his family moved to Nyahururu, Stephen enrolled at Ngare Naro Primary School and completed his studies through Standard Eight."
    },
    {
      date: "2000s",
      title: "Career Begins",
      description: "Stephen began working with AAK Company as a driver."
    },
    {
      date: "2015",
      title: "Career Change",
      description: "Stephen left his job and returned home, where he turned to farming."
    },
    {
      date: "Date Unknown",
      title: "Marriage",
      description: "Stephen married Teresiah Wairimu, and together they were blessed with three children: one son and two daughters."
    },
    {
      date: "March 26, 2025",
      title: "Tragic Incident",
      description: "Stephen was attacked by unknown assailants along Nyahururu Busara Road."
    },
    {
      date: "March 27, 2025",
      title: "Passing",
      description: "Stephen succumbed to his injuries at Nyahururu Referral Hospital at the age of 51."
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

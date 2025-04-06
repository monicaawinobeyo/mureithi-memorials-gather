
interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
}

const TimelineEvent = ({ date, title, description }: TimelineEventProps) => {
  return (
    <div className="timeline-item mb-8 relative pl-8 border-l-2 border-memorial-blue pb-6">
      <div className="timeline-dot absolute -left-[5px] w-3 h-3 bg-memorial-blue rounded-full mt-2" />
      <div className="ml-4">
        <span className="text-sm font-medium text-memorial-darkblue">{date}</span>
        <h3 className="text-lg font-serif font-medium text-gray-900 mt-1">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default TimelineEvent;

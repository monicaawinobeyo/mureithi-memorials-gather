
interface TimelineEventProps {
  date: string;
  title: string;
  description: string;
}

const TimelineEvent = ({ date, title, description }: TimelineEventProps) => {
  return (
    <div className="timeline-item">
      <div className="timeline-dot" />
      <div className="ml-4">
        <span className="text-sm font-medium text-memorial-darkblue">{date}</span>
        <h3 className="text-lg font-serif font-medium text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default TimelineEvent;

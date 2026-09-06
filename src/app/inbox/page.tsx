import AppLayout from "@/components/Common/AppLayout";
import FeedbackIngestion from "@/components/Feedback/FeedbackIngestion";
import FeedbackInbox from "@/components/Feedback/FeedbackInbox";

const InboxPage = () => {
  return (
    <AppLayout>
      <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <FeedbackIngestion />
        <FeedbackInbox />
      </div>
    </AppLayout>
  );
};

export default InboxPage;

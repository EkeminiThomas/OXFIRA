import EngagementsContainer from "@/components/containers/EngagementsContainer";
import PlatformContainer from "@/components/containers/PlatformContainer";
import PostActivityContainer from "@/components/containers/PostActivityContainer";
import RecentPostContainer from "@/components/containers/RecentPostContainer";
import SchedulePostContainer from "@/components/containers/SchedulePostContainer";
import LiveUpdates from "@/components/layouts/LiveUpdates";

export default function Dashboard() {
    return (
        <div className="w-full min-h-screen">
            <div className="w-full flex flex-col mt-4 p-4 gap-4">
                <div className="w-full flex flex-col lg:flex-row lg:justify-between outline outline-red-400 rounded-lg p-4 gap-4">
                    {/* FIX: stacks vertically on mobile/tablet (flex-col), switches to
                        side-by-side only at "lg" breakpoint (1024px) and up */}

                    <section className="flex-1 min-w-0">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Task Summary!</h1>
                            <p className="text-sm text-gray-400">Check what's happening to your post today.</p>
                        </div>
                        <LiveUpdates />
                        <section className="flex flex-col sm:flex-row justify-between gap-4 w-full">
                            {/* FIX: stacks on small screens, side-by-side from "sm" (640px) up */}
                            <EngagementsContainer />
                            <RecentPostContainer />
                        </section>
                    </section>

                    <section className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
                        {/* FIX: full width on mobile/tablet, fixed 18rem sidebar only at lg+ */}
                        <PlatformContainer />
                        <SchedulePostContainer />
                    </section>
                </div>

                <PostActivityContainer />
            </div>
        </div>
    )
}
import EngagementsContainer from "@/components/containers/EngagementsContainer";
import PlatformContainer from "@/components/containers/PlatformContainer";
import PostActivityContainer from "@/components/containers/PostActivityContainer";
import RecentPostContainer from "@/components/containers/RecentPostContainer";
import SchedulePostContainer from "@/components/containers/SchedulePostContainer";
import LiveUpdates from "@/components/layouts/LiveUpdates";

export default function Dashboard() {
    return (
        // FIX: anchor the page to fill the viewport
        <div className="w-full min-h-screen">
            <div className="w-full  flex flex-col mt-4 p-4 gap-4">
                {/* FIX: replaced m-10 with parent p-4 + gap-4, so spacing is even
                    and doesn't stack/shrink the box from both sides */}

                <div className="w-full flex justify-between outline outline-red-400 rounded-lg p-4 gap-4">
                    {/* FIX: added w-full so justify-between actually has room to distribute space */}
                    {/* top div */}

                    <section className="flex-1">
                        {/* FIX: flex-1 makes this take up its fair share of the row width */}
                        {/* left section */}
                        <h1 className="font-bold">Task Summary!</h1>
                        <span className="text-[12px] text-gray-400">Check what’s happening to your post today. </span>
                        <LiveUpdates />
                        <section className="flex justify-between gap-4 w-full">
                            {/* FIX: added w-full + gap-4 so the two containers spread out with spacing */}
                            <EngagementsContainer />
                            <RecentPostContainer />
                        </section>
                    </section>

                    <section className="flex-1 flex flex-col gap-4">
                        {/* FIX: flex-1 to balance against left section, gap-4 instead of relying on default spacing */}
                        {/* right section */}
                        <PlatformContainer />
                        <SchedulePostContainer />
                    </section>
                </div>

                <PostActivityContainer />
            </div>
        </div>
    )
}
import SidebarContainer from "@/components/containers/SideBarContainer";
import DashNavbar from "@/components/DashNavbar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* FIX: h-screen + overflow-hidden locks the entire shell to exactly
                one viewport tall. Without this, the div grows as tall as its
                content (navbar + sidebar + page content combined), and the
                browser scrolls the whole document — which is why the sidebar
                drifts out of view when you scroll. */}

            <DashNavbar />
            {/* Consider adding "shrink-0" here (see note below) if DashNavbar
                ever gets squeezed by content below it. */}

            <div className="flex flex-1 overflow-hidden">
                {/* FIX: flex-1 makes this row fill all remaining height below
                    DashNavbar. overflow-hidden stops this row itself from
                    scrolling — only the page content inside {children} should
                    scroll, not the sidebar next to it. */}

                <SidebarContainer />

                <main className="flex-1 overflow-y-auto">
                    {/* FIX: wrapped {children} in a <main> that's the ONLY
                        scrollable region. Sidebar and navbar now stay fixed
                        in place while the actual page content scrolls
                        underneath them. */}
                    {children}
                </main>
            </div>
        </div>
    )
}
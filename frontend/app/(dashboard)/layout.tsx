import SideBar from "@/components/shared/SideBar";


export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex ">

            <SideBar />
            <div>
                <section>Dashboard navbar</section>
                {children}
            </div>

        </div>
    )
}
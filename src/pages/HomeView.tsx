import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView () {
    return (
        <>
            <Header />

            <main
                className="bg-gray-100 py-10 min-h-screen md:bg-home md:bg-home-xl bg-no-repeat bg-right-top"
            >
                <div
                    className="max-w-5xl mx-auto mt-10"
                >
                    <div
                        className="md:w-1/2 px-10 md:p-0 space-y-6"
                    >
                        <h1 className="text-6xl font-black">All your <span className="text-cyan-600">Social Networks</span> in one single link</h1>

                        <p className="text-slate-800 text-xl">Join more than 200 thousand developers by sharing your social networks, share your Tiktok profile, Instragram, Youtube and much more.</p>

                        <SearchForm/>
                    </div>
                </div>
            </main>
        </>
    )
}
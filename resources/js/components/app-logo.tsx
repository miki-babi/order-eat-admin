import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-3 px-2">
            {/* <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-[#212121] text-white shadow-lg ring-1 ring-white/10 transition-transform hover:scale-105 active:scale-95"> */}
                {/* <AppLogoIcon className="size-6 fill-[#F57C00]" /> */}
            {/* </div> */}
            <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#212121]">
                    Digital Order
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F57C00]">
                    KDS Terminal
                </span>
            </div>
        </div>
    );
}

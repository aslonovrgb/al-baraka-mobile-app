import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Bell,
  Delete,
  CreditCard,
  Eye,
  EyeOff,
  Fingerprint,
  Home,
  LockKeyhole,
  LogOut,
  MoreHorizontal,
  ReceiptText,
  Repeat2,
  Send,
  ShieldCheck,
  Smartphone,
  UserRound,
  WalletCards,
} from "lucide-react";

const routeToPage = {
  "/app": "home",
  "/cards": "cards",
  "/payments": "payments",
  "/profile": "profile",
};

const appRoutes = ["/signin", ...Object.keys(routeToPage)];

function withoutTrailingSlash(pathname) {
  if (pathname === "/") {
    return pathname;
  }

  return pathname.replace(/\/+$/, "");
}

function routeFromPathname(pathname) {
  const cleanPath = withoutTrailingSlash(pathname);

  if (cleanPath === "" || cleanPath === "/") {
    return "/";
  }

  return (
    appRoutes.find((route) => cleanPath === route || cleanPath.endsWith(route)) ??
    "/"
  );
}

function basePathFromPathname(pathname) {
  const cleanPath = withoutTrailingSlash(pathname);

  if (cleanPath === "" || cleanPath === "/") {
    return "";
  }

  const route = appRoutes.find(
    (candidate) => cleanPath === candidate || cleanPath.endsWith(candidate),
  );

  if (!route) {
    return cleanPath;
  }

  const basePath = cleanPath.slice(0, cleanPath.length - route.length);
  return basePath === "/" ? "" : basePath;
}

const appBasePath = basePathFromPathname(window.location.pathname);

function browserPathForRoute(route) {
  if (!appBasePath) {
    return route;
  }

  return route === "/" ? `${appBasePath}/` : `${appBasePath}${route}`;
}

const pageToRoute = {
  home: "/app",
  cards: "/cards",
  payments: "/payments",
  profile: "/profile",
};

const logoSrc = `${import.meta.env.BASE_URL}al-baraka-logo.webp`;

const copy = {
  en: {
    bankName: "Al Baraka",
    bankNameAlt: "البركة",
    signInTitle: "Welcome back, Zain",
    signInSubtitle: "Private banking access for your everyday accounts.",
    signInButton: "Unlock account",
    useFaceId: "Use Face ID",
    pinLabel: "Passcode",
    secureSession: "Protected session",
    passcodeError: "Incorrect passcode",
    greeting: "Good evening",
    customer: "Zain Eddin Barakat",
    initials: "ZB",
    accountStatus: "Main account",
    totalBalance: "Total balance",
    available: "Available in SYP",
    accountType: "Current account",
    quickActions: "Quick actions",
    myCard: "My card",
    recent: "Recent transactions",
    viewAll: "View all",
    cardHolder: "ZAIN EDDIN BARAKAT",
    cardName: "Al Baraka Platinum",
    active: "Active",
    cardsTitle: "Cards",
    cardsSubtitle: "Manage your digital and physical cards.",
    paymentsTitle: "Payments",
    paymentsSubtitle: "Transfers, bills, top ups, and exchange.",
    profileTitle: "Profile",
    profileSubtitle: "Account, security, and preferences.",
    spendingLimit: "Monthly limit",
    cardBalance: "Card balance",
    security: "Security",
    language: "Language",
    signOut: "Sign out",
    showBalance: "Show balance",
    hideBalance: "Hide balance",
    actions: ["Transfer", "Pay Bills", "Top Up", "Exchange"],
    nav: ["Home", "Cards", "Payments", "Profile"],
  },
  ar: {
    bankName: "البركة",
    bankNameAlt: "Al Baraka",
    signInTitle: "أهلاً بك، زين الدين",
    signInSubtitle: "وصول مصرفي خاص وآمن لحساباتك اليومية.",
    signInButton: "فتح الحساب",
    useFaceId: "استخدم بصمة الوجه",
    pinLabel: "رمز الدخول",
    secureSession: "جلسة محمية",
    passcodeError: "رمز الدخول غير صحيح",
    greeting: "مساء الخير",
    customer: "زين الدين بركات",
    initials: "ZB",
    accountStatus: "الحساب الرئيسي",
    totalBalance: "الرصيد الإجمالي",
    available: "متاح بالليرة السورية",
    accountType: "حساب جار",
    quickActions: "إجراءات سريعة",
    myCard: "بطاقتي",
    recent: "آخر العمليات",
    viewAll: "عرض الكل",
    cardHolder: "زين الدين بركات",
    cardName: "بطاقة البركة",
    active: "نشطة",
    cardsTitle: "البطاقات",
    cardsSubtitle: "إدارة البطاقات الرقمية والفيزيائية.",
    paymentsTitle: "المدفوعات",
    paymentsSubtitle: "تحويلات وفواتير وشحن وصرف.",
    profileTitle: "الملف الشخصي",
    profileSubtitle: "الحساب والأمان والتفضيلات.",
    spendingLimit: "الحد الشهري",
    cardBalance: "رصيد البطاقة",
    security: "الأمان",
    language: "اللغة",
    signOut: "تسجيل الخروج",
    showBalance: "إظهار الرصيد",
    hideBalance: "إخفاء الرصيد",
    actions: ["تحويل", "فواتير", "شحن", "صرف"],
    nav: ["الرئيسية", "البطاقات", "المدفوعات", "الملف"],
  },
};

const account = {
  balance: "102,000,000 SYP",
  hiddenBalance: "•••••••• SYP",
  cardBalance: "31,000,000 SYP",
  monthlyLimit: "130,000,000 SYP",
  number: "**** 4281",
  cardNumber: "5284 **** **** 9012",
  expiry: "09/29",
};

const actionIcons = [Send, ReceiptText, Smartphone, Repeat2];
const navIcons = [Home, CreditCard, WalletCards, UserRound];

const transactions = [
  {
    title: "Damascus Market",
    arTitle: "سوق دمشق",
    subtitle: "Groceries",
    arSubtitle: "مشتريات يومية",
    amount: "-750,000 SYP",
    tone: "debit",
  },
  {
    title: "Salary Deposit",
    arTitle: "إيداع راتب",
    subtitle: "Main account",
    arSubtitle: "الحساب الرئيسي",
    amount: "+102,000,000 SYP",
    tone: "credit",
  },
  {
    title: "Mobile Top Up",
    arTitle: "شحن رصيد",
    subtitle: "MTN Syria",
    arSubtitle: "إعادة شحن",
    amount: "-155,000 SYP",
    tone: "debit",
  },
  {
    title: "Card Payment",
    arTitle: "دفع بالبطاقة",
    subtitle: "Pharmacy",
    arSubtitle: "صيدلية",
    amount: "-440,000 SYP",
    tone: "debit",
  },
];

function App() {
  const [language, setLanguage] = useState("ar");
  const [route, setRoute] = useState(routeFromPathname(window.location.pathname));
  const [balanceVisible, setBalanceVisible] = useState(true);
  const isArabic = language === "ar";
  const t = copy[language];
  const activePage = routeToPage[route] ?? "home";
  const isSignIn = route === "/signin";

  useEffect(() => {
    const handlePopState = () =>
      setRoute(routeFromPathname(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (route === "/") {
      navigate("/signin", { replace: true });
    }
  }, [route]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.title = `${t.bankName} App`;
  }, [isArabic, language, t.bankName]);

  function navigate(path, options = {}) {
    const browserPath = browserPathForRoute(path);

    if (window.location.pathname !== browserPath) {
      if (options.replace) {
        window.history.replaceState(null, "", browserPath);
      } else {
        window.history.pushState(null, "", browserPath);
      }
    }

    setRoute(path);
  }

  if (isSignIn) {
    return (
      <SignInScreen
        language={language}
        navigate={navigate}
        setLanguage={setLanguage}
        t={t}
      />
    );
  }

  return (
    <main className="h-dvh w-full overflow-hidden bg-bank-ink text-bank-ink">
      <div className="mx-auto flex h-dvh w-full flex-col overflow-hidden bg-bank-surface md:max-w-[480px]">
        <AppHeader language={language} setLanguage={setLanguage} t={t} />

        <section className="app-scrollbar flex-1 overflow-y-auto bg-bank-surface">
          {activePage === "home" && (
            <HomeScreen
              balanceVisible={balanceVisible}
              isArabic={isArabic}
              setBalanceVisible={setBalanceVisible}
              t={t}
            />
          )}
          {activePage === "cards" && (
            <CardsScreen balanceVisible={balanceVisible} isArabic={isArabic} t={t} />
          )}
          {activePage === "payments" && (
            <PaymentsScreen
              balanceVisible={balanceVisible}
              isArabic={isArabic}
              navigate={navigate}
              t={t}
            />
          )}
          {activePage === "profile" && (
            <ProfileScreen
              balanceVisible={balanceVisible}
              language={language}
              navigate={navigate}
              setBalanceVisible={setBalanceVisible}
              setLanguage={setLanguage}
              t={t}
            />
          )}
        </section>

        <BottomNavigation activePage={activePage} navigate={navigate} t={t} />
      </div>
    </main>
  );
}

function SignInScreen({ language, navigate, setLanguage, t }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const correctPasscode = "111111";
  const passcodeComplete = passcode.length === 6;

  function submitPasscode(nextPasscode = passcode) {
    if (nextPasscode === correctPasscode) {
      setError("");
      navigate("/app");
      return;
    }

    if (nextPasscode.length === 6) {
      setError(t.passcodeError);
      setPasscode("");
    }
  }

  function pressDigit(digit) {
    setError("");
    setPasscode((current) => {
      if (current.length >= 6) return current;
      const next = `${current}${digit}`;
      if (next.length === 6) {
        window.setTimeout(() => submitPasscode(next), 140);
      }
      return next;
    });
  }

  function removeDigit() {
    setError("");
    setPasscode((current) => current.slice(0, -1));
  }

  return (
    <main className="h-dvh w-full overflow-hidden bg-bank-ink text-white">
      <div className="signin-pattern absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex h-dvh w-full flex-col px-5 md:max-w-[480px]">
        <header className="mobile-safe-top flex items-center justify-between pb-8">
          <BrandMark t={t} />
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </header>

        <section className="app-scrollbar flex flex-1 flex-col overflow-y-auto pb-5 pt-4">
          <div className="mx-auto grid h-20 w-20 place-items-center overflow-hidden rounded-[26px] bg-white shadow-glass">
            <img
              src={logoSrc}
              alt="Al Baraka logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-5 text-center">
            <h1 className="text-[28px] font-semibold leading-tight tracking-normal">
              {t.signInTitle}
            </h1>
            <p className="mx-auto mt-3 max-w-[310px] text-sm leading-6 text-white/[0.64]">
              {t.signInSubtitle}
            </p>
          </div>

          <div className="mt-6 rounded-[30px] border border-white/[0.12] bg-white/[0.08] p-4 backdrop-blur-xl">
            <div className="rounded-2xl bg-white/[0.08] px-4 py-3 text-center">
              <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-white/[0.1] text-bank-gold">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <p className="text-xs text-white/[0.58]">{t.pinLabel}</p>
              <div className="mt-3 flex justify-center gap-2" aria-label={t.pinLabel}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-3 w-3 rounded-full border transition ${
                      index < passcode.length
                        ? "border-bank-gold bg-bank-gold"
                        : "border-white/[0.24] bg-white/[0.06]"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 min-h-5 text-xs font-medium text-bank-greenDark">
                {error}
              </p>
            </div>

            <PasscodePad onDelete={removeDigit} onDigit={pressDigit} />

            <button
              type="button"
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition ${
                passcodeComplete
                  ? "bg-gradient-to-br from-bank-green to-bank-greenDark shadow-bank-greenDark/20"
                  : "bg-white/[0.12] text-white/[0.48]"
              }`}
              disabled={!passcodeComplete}
              onClick={() => submitPasscode()}
            >
              <Fingerprint className="h-5 w-5" />
              {t.signInButton}
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-bank-gold">
              <ShieldCheck className="h-4 w-4" />
              <span>{t.secureSession}</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function PasscodePad({ onDelete, onDigit }) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "delete"];

  return (
    <div className="mt-4 grid grid-cols-3 gap-2" dir="ltr">
      {keys.map((key, index) => {
        if (key === "") {
          return <span key={`empty-${index}`} />;
        }

        if (key === "delete") {
          return (
            <button
              key={key}
              type="button"
              className="grid h-11 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.05] text-white/[0.78] transition active:scale-[0.98]"
              aria-label="Delete digit"
              onClick={onDelete}
            >
              <Delete className="h-5 w-5 rtl-flip" />
            </button>
          );
        }

        return (
          <button
            key={key}
            type="button"
            className="grid h-11 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.07] text-lg font-semibold text-white transition active:scale-[0.98]"
            onClick={() => onDigit(key)}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
}

function HomeScreen({ balanceVisible, isArabic, setBalanceVisible, t }) {
  return (
    <>
      <div className="relative overflow-hidden bg-bank-ink px-5 pb-6 text-white">
        <div className="app-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <GreetingBlock t={t} />
        <BalanceCard
          balanceVisible={balanceVisible}
          setBalanceVisible={setBalanceVisible}
          t={t}
        />
        <MainAccountCard balanceVisible={balanceVisible} t={t} />
      </div>

      <div className="space-y-5 px-5 pb-6 pt-5">
        <QuickActions isArabic={isArabic} t={t} />
        <BankCardPreview t={t} />
        <RecentTransactions balanceVisible={balanceVisible} isArabic={isArabic} t={t} />
      </div>
    </>
  );
}

function CardsScreen({ balanceVisible, isArabic, t }) {
  return (
    <PageShell subtitle={t.cardsSubtitle} title={t.cardsTitle}>
      <BankCardPreview t={t} />
      <MetricGrid
        items={[
          { label: t.cardBalance, value: money(account.cardBalance, balanceVisible) },
          { label: t.spendingLimit, value: money(account.monthlyLimit, balanceVisible) },
        ]}
      />
      <RecentTransactions balanceVisible={balanceVisible} isArabic={isArabic} t={t} />
    </PageShell>
  );
}

function PaymentsScreen({ balanceVisible, isArabic, navigate, t }) {
  return (
    <PageShell subtitle={t.paymentsSubtitle} title={t.paymentsTitle}>
      <QuickActions isArabic={isArabic} t={t} />
      <MainAccountCard balanceVisible={balanceVisible} t={t} />
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-[24px] bg-gradient-to-br from-bank-green to-bank-greenDark px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-bank-greenDark/15"
        onClick={() => navigate("/app")}
      >
        <Send className="h-4 w-4 rtl-flip" />
        {t.actions[0]}
      </button>
      <RecentTransactions balanceVisible={balanceVisible} isArabic={isArabic} t={t} />
    </PageShell>
  );
}

function ProfileScreen({
  balanceVisible,
  language,
  navigate,
  setBalanceVisible,
  setLanguage,
  t,
}) {
  return (
    <PageShell subtitle={t.profileSubtitle} title={t.profileTitle}>
      <section className="rounded-[26px] border border-bank-line bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-[24px] bg-gradient-to-br from-bank-green to-bank-greenDark text-xl font-semibold text-white">
            {t.initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{t.customer}</p>
            <p className="mt-1 truncate text-sm text-bank-muted">
              {t.accountStatus} · <bdi>{account.number}</bdi>
            </p>
          </div>
        </div>
      </section>

      <SettingsRow
        icon={balanceVisible ? Eye : EyeOff}
        label={balanceVisible ? t.hideBalance : t.showBalance}
        onClick={() => setBalanceVisible((visible) => !visible)}
        value={money(account.balance, balanceVisible)}
      />
      <SettingsRow icon={ShieldCheck} label={t.security} value={t.secureSession} />
      <section className="rounded-[26px] border border-bank-line bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">{t.language}</p>
            <p className="mt-1 text-xs text-bank-muted">{t.bankNameAlt}</p>
          </div>
          <div className="rounded-full bg-bank-ink p-1">
            <LanguageToggle language={language} setLanguage={setLanguage} />
          </div>
        </div>
      </section>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-[24px] border border-bank-line bg-white px-5 py-4 text-sm font-semibold text-bank-greenDark shadow-sm"
        onClick={() => navigate("/signin")}
      >
        <LogOut className="h-4 w-4 rtl-flip" />
        {t.signOut}
      </button>
    </PageShell>
  );
}

function PageShell({ children, subtitle, title }) {
  return (
    <div className="space-y-5 px-5 pb-6 pt-5">
      <section className="rounded-[30px] bg-bank-ink p-5 text-white shadow-glass">
        <p className="text-sm text-bank-gold">{subtitle}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal">{title}</h2>
      </section>
      {children}
    </div>
  );
}

function AppHeader({ language, setLanguage, t }) {
  return (
    <header className="mobile-safe-top relative z-20 bg-bank-ink px-5 pb-4 text-white">
      <div className="flex items-center justify-between gap-3">
        <BrandMark t={t} />

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <IconButton label="Notifications">
            <Bell className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function BrandMark({ t }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white">
        <img
          src={logoSrc}
          alt="Al Baraka logo"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold tracking-normal">
          {t.bankName}
        </h1>
        <p className="truncate text-xs text-white/[0.58]">{t.bankNameAlt}</p>
      </div>
    </div>
  );
}

function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="flex rounded-full border border-white/[0.12] bg-white/[0.08] p-1">
      {["en", "ar"].map((item) => (
        <button
          key={item}
          type="button"
          data-testid={`language-${item}`}
          className={`h-8 min-w-9 rounded-full px-2 text-[11px] font-semibold transition ${
            language === item
              ? "bg-gradient-to-br from-bank-green to-bank-greenDark text-white"
              : "text-white/[0.62] hover:text-white"
          }`}
          onClick={() => setLanguage(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function IconButton({ children, label }) {
  return (
    <button
      type="button"
      className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.12] bg-white/[0.08] text-white transition hover:bg-white/[0.14]"
      aria-label={label}
    >
      {children}
    </button>
  );
}

function GreetingBlock({ t }) {
  return (
    <div className="relative pt-2">
      <p className="text-sm text-white/[0.62]">{t.greeting}</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-normal">
        {t.customer}
      </h2>
    </div>
  );
}

function BalanceCard({ balanceVisible, setBalanceVisible, t }) {
  const BalanceIcon = balanceVisible ? Eye : EyeOff;

  return (
    <section className="relative mt-5 rounded-[28px] border border-white/[0.14] bg-white/[0.1] p-5 shadow-glass backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-white/[0.62]">{t.totalBalance}</p>
          <p className="mt-2 whitespace-nowrap text-[30px] font-semibold leading-tight tracking-normal">
            <bdi>{money(account.balance, balanceVisible)}</bdi>
          </p>
          <p className="mt-2 text-sm font-medium text-bank-gold">
            {t.available}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.1] text-bank-gold"
            aria-label={balanceVisible ? t.hideBalance : t.showBalance}
            onClick={() => setBalanceVisible((visible) => !visible)}
          >
            <BalanceIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/[0.1] text-bank-gold"
            aria-label="More balance options"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function MainAccountCard({ balanceVisible, t }) {
  return (
    <section className="relative mt-4 rounded-[24px] border border-white/[0.12] bg-white p-4 text-bank-ink shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-bank-green/20 to-bank-greenDark/20 text-bank-greenDark">
            <WalletCards className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{t.accountStatus}</p>
            <p className="mt-1 truncate text-xs text-bank-muted">
              {t.accountType}
            </p>
          </div>
        </div>
        <div className="text-end">
          <p className="text-sm font-semibold">
            <bdi>{account.number}</bdi>
          </p>
          <p className="mt-1 text-xs text-bank-greenDark">
            {balanceVisible ? t.active : "••••"}
          </p>
        </div>
      </div>
    </section>
  );
}

function QuickActions({ isArabic, t }) {
  return (
    <section className="rounded-[26px] border border-bank-line bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">{t.quickActions}</h3>
        <span className="text-xs font-medium text-bank-muted">
          {isArabic ? "EN / عربي" : "عربي / EN"}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {t.actions.map((label, index) => {
          const Icon = actionIcons[index];
          return (
            <button
              key={label}
              type="button"
              className="min-h-[86px] rounded-2xl border border-bank-line bg-bank-surface px-2 py-3 text-center transition active:scale-[0.98]"
            >
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-bank-green/[0.22] text-bank-greenDark">
                <Icon className="h-4 w-4" />
              </span>
              <span className="mt-2 block text-[11px] font-semibold leading-4">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function BankCardPreview({ t }) {
  return (
    <section className="rounded-[26px] border border-bank-line bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold">{t.myCard}</h3>
        <CreditCard className="h-5 w-5 text-bank-greenDark" />
      </div>
      <div className="relative overflow-hidden rounded-[24px] bg-bank-ink p-5 text-white">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-bank-green/[0.18] blur-2xl" />
        <div className="absolute -bottom-14 left-10 h-32 w-32 rounded-full bg-bank-gold/[0.14] blur-2xl" />
        <div className="relative flex items-center justify-between">
          <span className="text-sm font-semibold">{t.cardName}</span>
          <span className="text-xs font-semibold text-bank-green">VISA</span>
        </div>
        <p className="relative mt-9 text-lg font-semibold tracking-normal">
          <bdi>{account.cardNumber}</bdi>
        </p>
        <div className="relative mt-6 flex items-end justify-between gap-4 text-xs text-white/[0.62]">
          <span>{t.cardHolder}</span>
          <span>
            <bdi>{account.expiry}</bdi>
          </span>
        </div>
      </div>
    </section>
  );
}

function RecentTransactions({ balanceVisible, isArabic, t }) {
  return (
    <section className="rounded-[26px] border border-bank-line bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">{t.recent}</h3>
        <button
          type="button"
          className="text-xs font-semibold text-bank-greenDark"
        >
          {t.viewAll}
        </button>
      </div>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <TransactionRow
            balanceVisible={balanceVisible}
            key={transaction.title}
            isArabic={isArabic}
            transaction={transaction}
          />
        ))}
      </div>
    </section>
  );
}

function TransactionRow({ balanceVisible, isArabic, transaction }) {
  const title = isArabic ? transaction.arTitle : transaction.title;
  const subtitle = isArabic ? transaction.arSubtitle : transaction.subtitle;
  const isCredit = transaction.tone === "credit";

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-bank-surface p-3">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
            isCredit
              ? "bg-bank-green/[0.22] text-bank-greenDark"
              : "bg-white text-bank-muted"
          }`}
        >
          {isCredit ? (
            <Send className="h-4 w-4 rtl-flip" />
          ) : (
            <ReceiptText className="h-4 w-4" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="mt-1 truncate text-xs text-bank-muted">{subtitle}</p>
        </div>
      </div>
      <p
        className={`shrink-0 text-xs font-semibold ${
          isCredit ? "text-bank-greenDark" : "text-bank-ink"
        }`}
      >
        <bdi>{money(transaction.amount, balanceVisible)}</bdi>
      </p>
    </div>
  );
}

function MetricGrid({ items }) {
  return (
    <section className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-[24px] border border-bank-line bg-white p-4 shadow-sm"
        >
          <p className="text-xs text-bank-muted">{item.label}</p>
          <p className="mt-2 text-lg font-semibold">
            <bdi>{item.value}</bdi>
          </p>
        </div>
      ))}
    </section>
  );
}

function SettingsRow({ icon: Icon, label, onClick, value }) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      type={onClick ? "button" : undefined}
      className="flex w-full items-center justify-between gap-4 rounded-[26px] border border-bank-line bg-white p-4 text-start shadow-sm"
      onClick={onClick}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-bank-surface text-bank-greenDark">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{label}</span>
          <span className="mt-1 block truncate text-xs text-bank-muted">
            {value}
          </span>
        </span>
      </div>
    </Component>
  );
}

function BottomNavigation({ activePage, navigate, t }) {
  return (
    <nav className="mobile-safe-bottom border-t border-bank-line bg-white/[0.92] px-5 pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-4 gap-1">
        {t.nav.map((label, index) => {
          const Icon = navIcons[index];
          const page = Object.keys(pageToRoute)[index];
          const active = activePage === page;
          return (
            <button
              key={label}
              type="button"
              className={`flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition ${
                active
                  ? "bg-bank-green/[0.18] text-bank-greenDark"
                  : "text-bank-muted hover:bg-bank-surface"
              }`}
              onClick={() => navigate(pageToRoute[page])}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function money(value, visible) {
  return visible ? value : account.hiddenBalance;
}

export default App;

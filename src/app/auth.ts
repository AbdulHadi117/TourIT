export type AuthMode = "signin" | "register";

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  travelStyle: string;
  languages: string[];
  newsletter: boolean;
  safetyAlerts: boolean;
  memberSince: string;
  tripsPlanned: number;
  wishlistCount: number;
  avatarSeed: string;
  themeColor: string;
};

const STORAGE_KEY = "tourit.user.profile";

function formatMemberSince(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function createDefaultUserProfile({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}): UserProfile {
  const safeName = fullName.trim() || email.split("@")[0] || "Traveler";
  return {
    id: crypto.randomUUID(),
    fullName: safeName,
    email,
    phone: "+92 300 0000000",
    location: "Lahore, Pakistan",
    bio: "Planning Pakistan trips, saving routes, and keeping travel notes organized.",
    travelStyle: "Balanced explorer",
    languages: ["English", "Urdu"],
    newsletter: true,
    safetyAlerts: true,
    memberSince: formatMemberSince(new Date()),
    tripsPlanned: 4,
    wishlistCount: 12,
    avatarSeed: getInitials(safeName),
    themeColor: "#0E8C88",
  };
}

export function loadStoredUserProfile(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as UserProfile;
    if (!parsed?.fullName || !parsed?.email) {
      return null;
    }
    return {
      ...parsed,
      avatarSeed: parsed.avatarSeed || getInitials(parsed.fullName),
    };
  } catch {
    return null;
  }
}

export function saveStoredUserProfile(user: UserProfile) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUserProfile() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function deriveAvatarSeed(name: string) {
  return getInitials(name);
}

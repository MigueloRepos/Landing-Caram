import { createServerFn } from "@tanstack/react-start";

export const getFlavorsFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ozgppqgjjsgqzppdptjb.supabase.co";
    const supabaseKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      "sb_publishable_Mc83GxvoIgW3_3N_ucyJyQ_3cL8FiiE";

    const response = await fetch(`${supabaseUrl}/rest/v1/Helados_Taste`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch flavors: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
});

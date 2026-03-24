export async function addToWatchlist(supabase, userId, symbol) {
  return supabase.from("watchlist").insert({ symbol, user_id: userId });
}

export async function getWatchlist(supabase, userId) {
  const { data } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", userId);

  return data || null;
}

export async function removeFromWatchlist(supabase, id) {
  return supabase.from("watchlist").delete().eq("id", id);
}
// Supabase konfiguracija
const SUPABASE_URL = "https://fgxetkmkpquccnuqjqwy.supabase.co";
const SUPABASE_KEY = "sb_publishable_X1DOOg3btgBAvTpInLJ0nw_iqcR9SnT";

// Kreiranje Supabase klijenta
const supabaseClient = {
    async saveResult(result) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                },
                body: JSON.stringify({
                    name: result.name,
                    bzr_score: result.bzr.score,
                    bzr_total: result.bzr.total,
                    bzr_percent: result.bzr.percent,
                    bzr_passed: result.bzr.passed,
                    ppz_score: result.ppz.score,
                    ppz_total: result.ppz.total,
                    ppz_percent: result.ppz.percent,
                    ppz_passed: result.ppz.passed,
                    overall_passed: result.overall,
                    date: result.date
                })
            });
            
            if (!response.ok) {
                throw new Error('Greška pri čuvanju');
            }
            return { success: true };
        } catch (error) {
            console.error('Greška:', error);
            return { success: false, error: error.message };
        }
    },

    async getResults() {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/results?order=date.desc`, {
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Greška pri učitavanju');
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Greška:', error);
            return { success: false, error: error.message, data: [] };
        }
    },

    async deleteResult(id) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/results?id=eq.${id}`, {
                method: 'DELETE',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Greška pri brisanju');
            }
            return { success: true };
        } catch (error) {
            console.error('Greška:', error);
            return { success: false, error: error.message };
        }
    },

    async clearAllResults() {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/results`, {
                method: 'DELETE',
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Greška pri brisanju');
            }
            return { success: true };
        } catch (error) {
            console.error('Greška:', error);
            return { success: false, error: error.message };
        }
    }
};
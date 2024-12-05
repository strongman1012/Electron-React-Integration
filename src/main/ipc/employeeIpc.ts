import { ipcMain, BrowserWindow } from 'electron';
import axios from 'axios';

/* Timelive variables */
const APIKey = "20408047-AA3C-4D48-8B1F-16B4EB05980E";
const AuthToken = "2F7F50D3-C8BF-4878-8F57-7FA021EEB983";
const admin_mail = "richardone.lrlogic@gmail.com";

// Handle fetching TimeLive employees with headers
ipcMain.handle('fetch-timelive-employees', async () => {
  try {
    const response = await axios.get('http://20.109.73.149/api/employees', {
      headers: {
        'APIKey': APIKey,
        'AuthToken': AuthToken,
        'Content-Type': 'application/json',
        'User-Agent': `MyApp (${admin_mail})`,
      },
    });

    return {
      success: true,
      data: response.data || [],
    };
  } catch (error: any) {
    console.error('Error fetching TimeLive employees:', error);
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
});

/* Quickbooks variables */
const realmId = 9341453556430694;
const clientId = "ABRdnZdkaGefoCBrt4rARJnUepaNPXeYu2W1F6MN7Uz3OvAKhu";
const clientSecret = "azsFgerAKE4Dtomd2SkHJNj1VwOyq9npF2QOc82e";
const refresh_token = "AB11742123396RBhBezUuoTNgcKnH9esrxh0Nr8wSmwJ3PkP4X";

const refreshTokensDirectly = async (refresh_token: string) => {
  const url = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';

  try {
    const response = await axios.post(
      url,
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Update tokens with the response
    const newTokens = response.data;
    return newTokens;

  } catch (error: any) {
    console.error('Error refreshing tokens:', error.response ? error.response.data : error.message);
    throw new Error('Failed to refresh access token.');
  }
};

// Handle fetching QuickBooks employees
ipcMain.handle('fetch-quickbooks-employees', async () => {
  const refresh_tokens = await refreshTokensDirectly(refresh_token);
  const access_token = refresh_tokens.access_token;
  try {
    const response = await axios.get(
      `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/query`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
        params: {
          query: 'SELECT * FROM Employee',
        },
      }
    );

    return {
      success: true,
      data: response.data.QueryResponse.Employee || [],
    };
  } catch (error: any) {
    console.error('Error fetching QuickBooks2 employees:', error);
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
});

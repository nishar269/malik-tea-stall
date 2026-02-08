# How to Setup MongoDB Atlas (Cloud Database)

Since we are moving to a production-ready setup, we should use a Cloud Database. This ensures your data is safe and accessible from anywhere (not just your laptop).

## Step 1: Create an Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Sign up (it's free).

## Step 2: Create a Cluster
1. Create a **New Cluster** (Select the **FREE** tier, usually named M0).
2. Choose a provider (AWS) and region (Mumbai/India is best).
3. Click **Create Deployment**.

## Step 3: Create a Database User
1. Go to **Database Access** (sidebar).
2. Click **Add New Database User**.
3. Username: `admin` (or whatever you prefer).
4. Password: `password123` (make it strong!).
5. **IMPORTANT**: Remember this password.

## Step 4: Allow Network Access
1. Go to **Network Access** (sidebar).
2. Click **Add IP Address**.
3. Select **Allow Access from Anywhere** (`0.0.0.0/0`).
4. Click **Confirm**.

## Step 5: Get Connection String
1. Go to **Database** (sidebar).
2. Click **Connect** on your cluster.
3. Select **Drivers**.
4. Copy the **Connection String**.
   - It looks like: `mongodb+srv://admin:<password>@cluster0.12345.mongodb.net/?retryWrites=true&w=majority`

## Step 6: Paste it here
Paste that connection string in the chat, and I will configure the application for you!

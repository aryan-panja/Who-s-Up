import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LockIcon } from 'lucide-react'
import { CheckUniqueEmail, CheckUniqueUsername, Login, SignUp } from '@/utils/AuthController'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/AuthContext'

export const Auth = () => {

    const navigate = useNavigate();

    const {login} = useAuth();

    // Signup form state
    const [profilePic, setProfilePic] = useState(null)
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpUsername, setSignUpUsername] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')

    // Login form state
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    // checking if the signup email & signup username is valid or not
    const [signUpEmailValid, setSignUpEmailValid] = useState(null);
    const [signUpUsernameValid, setSignUpUsernameValid] = useState(null);

    // Error messages for email and username
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    // Loading state
    const [signupLoading, setSignupLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    // Email validation
    const validEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Username validation (only numbers, small letters and underscores accepted and we will apply @ from our side)
    const validUsername = (username) => {
        const re = /^[a-z0-9_]+$/;
        return re.test(username);
    }

    // Checking the uniqueness of email
    const checkEmail = async (email) => {
        if (email === '') {
            setSignUpEmailValid(false);
            setEmailError('');
            // setEmailError('Email cannot be empty');
            return;
        }
        if (!validEmail(email)) {
            setSignUpEmailValid(false);
            setEmailError('Enter valid Email');
            return;
        }
        const response = await CheckUniqueEmail(email);
        if (response && response.status === 200) {
            setSignUpEmailValid(true);
            setEmailError('');
        } else {
            setSignUpEmailValid(false);
            setEmailError('Email is already taken');
        }
        console.log(response);
    }

    useEffect(() => {
        const email = setTimeout(() => {
            checkEmail(signUpEmail);
        }, 1000);

        return () => clearTimeout(email);
    }, [signUpEmail]);

    // Checking the uniqueness of username
    const checkUserName = async (username) => {
        if (username === '') {
            setSignUpUsernameValid(false);
            setUsernameError('');
            // setUsernameError('Username cannot be empty');
            return;
        }
        if (!validUsername(username)) {
            setSignUpUsernameValid(false);
            setUsernameError('Enter valid Username. Only include small letters, numbers and underscores no @');
            return;
        }
        console.log('@' + username);
        const response = await CheckUniqueUsername('@' + username);
        if (response && response.status === 200) {
            setSignUpUsernameValid(true);
            setUsernameError('');
        } else {
            setSignUpUsernameValid(false);
            setUsernameError('Username is already taken');
        }
        console.log(response);
    }

    useEffect(() => {
        const userName = setTimeout(() => {
            checkUserName(signUpUsername);
        }, 1000);

        return () => clearTimeout(userName);
    }, [signUpUsername]);

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePic(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    // Handle SignUp form submission
    const handleSignUp = async (e) => {
        setSignupLoading(true);
        e.preventDefault();
        if (signUpEmailValid && signUpUsernameValid) {
            try {
                const response = await SignUp({
                    username: '@' + signUpUsername,
                    email: signUpEmail,
                    password: signUpPassword,
                    profile_pic: profilePic || null
                });
                login(response.data);
                console.log(response);
                setTimeout(() => {
                    navigate('/');
                    setSignupLoading(false);
                }, 2000);
            }
            catch (error) {
                console.log('signup error', error);
            }

        } else {
            alert('Email and Username are not valid');
            setSignupLoading(false);
        }

    }

    // Handle Login form submission
    const handleLogin = async (e) => {
        setLoginLoading(true);
        e.preventDefault();
        if (validEmail(loginEmail)) {
            try{
                const response = await Login(loginEmail, loginPassword);
                login(response.data);
                console.log(response);
                setTimeout(() => {
                    navigate('/');
                    setLoginLoading(false);
                }, 2000);
            }
            catch(error){
                console.log('login error', error);
            }

        } else {
            alert('Email and Password are not valid');
            setLoginLoading(false);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
            <Card className="w-full max-w-[480px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">Welcome</CardTitle>
                    <CardDescription className="text-center">
                        Sign in to continue messaging with your friends and family
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email-login">Email</Label>
                                    <Input id="email-login" type="email" placeholder="m@example.com" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password-login">Password</Label>
                                    <Input id="password-login" type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="stay-logged-in" />
                                    <label
                                        htmlFor="stay-logged-in"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Stay logged in on this browser
                                    </label>
                                </div>
                                <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1ea952]" onClick={handleLogin}>
                                    {
                                        loginLoading ? 'Entering...' : 'Log In'
                                    }
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup">
                            <form className="space-y-4">
                                <div className="flex justify-center mb-4">
                                    <div className="relative">
                                        <Avatar className="w-24 h-24">
                                            <AvatarImage src={profilePic || ''} />
                                            <AvatarFallback>UP</AvatarFallback>
                                        </Avatar>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            aria-label="Upload profile picture"
                                        />
                                        <div className="absolute bottom-0 right-0 bg-[#25D366] text-white p-1 rounded-full text-xs">
                                            Upload
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-md">
                                    <Label htmlFor="username">
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        placeholder="dank_hero"
                                        required
                                        value={signUpUsername}
                                        onChange={(e) => setSignUpUsername(e.target.value)}
                                    />
                                    {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                        value={signUpEmail}
                                        onChange={(e) => setSignUpEmail(e.target.value)}
                                    />
                                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        value={signUpPassword}
                                        onChange={(e) => setSignUpPassword(e.target.value)}
                                    />
                                </div>
                                <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#1ea952]" onClick={handleSignUp}>
                                    {
                                        signupLoading ? 'Creating Account...' : 'Create Account'
                                    }
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground gap-2">
                        <LockIcon className="w-4 h-4" />
                        <p>Your personal data is securely encrypted</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

import Auth from '@/components/Auth'
import Quote from '@/components/Quote';

const SignIn = () => {
    return (
        <section className='flex h-full w-full justify-center '>
            <div className='flex-1 flex justify-center'>
                <Quote/>
            </div>
            <div className='flex-1 flex justify-center'>
                <Auth type='signin' />
            </div>
        </section>
    );
}

export default SignIn;
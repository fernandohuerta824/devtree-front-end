import loadingGif from './../../assets/loading.gif'

export default function Loading() {
    return (
        <div className='flex justify-center items-center w-full min-h-full'>
            <img src={loadingGif} alt='Loading...'  className='w-12' />
        </div>
    )
}
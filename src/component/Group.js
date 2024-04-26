import AppLayout from "../layout/AppLayout"

export const Group = () =>{
    return (
        <AppLayout>
        <div className='tw-absolute tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2'>
        <p className='main-title-animated tw-text-[34px] tw-font-fontMoreBold tw-leading-[42px] tw-tracking-[-0.03em] tw-text-blueDark md:tw-text-[44px] md:tw-leading-[54px] lg:tw-text-[52px] lg:tw-leading-[64px]'>
          Releasing Soon
        </p>
        <p className='tw-pt-[20px] tw-text-center tw-text-[16px] tw-font-[400]'>
          <span>Stay tuned! or </span>
          <a
            href='https://makewebbetter.com/contact-us/'
            className='tw-text-[#1570EF]'
            target='_blank'
          >
            Contact Us
          </a>
        </p>
      </div>
      </AppLayout>
    )
}
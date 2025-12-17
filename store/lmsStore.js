import { create } from 'zustand'

const useLmsStore = create((set) => ({
    user: null,
    cart: [],
    popupVisible: false,
    courseDetails: null,
    formDetails: null,
    buyingCourse: null,
    showQuickPayment: false,
    cartVisitor: null,
    courseList: [],
    popupFormProps: {
        visible: false,
        alreadySubmitted: false,
        fields: ["fullName", "email", "phone", "qualification", "demoDate"], // {name, email, phone, message}
        heading: "Registration Form",
        buttonLabel: "Register Now",
        pageName: null,
        courseTitle: "",
        courseId: "",
        onSuccess: () => { },
        hiddenFields: {}
    },

    setUser: (user) => set({ user }),
    addToCart: (courseId) => set((state) => ({
        cart: [...state.cart, courseId]
    })),
    removeFromCart: (courseId) => set((state) => ({
        cart: state.cart.filter(id => id !== courseId)
    })),
    togglePopup: () => set((state) => ({
        popupVisible: !state.popupVisible
    })),
    setCourseDetails: (details) => set({ courseDetails: details }),
    setFormHeading: (heading) => set({ formHeading: heading }),
    setBuyingCourse: (course) => set({ buyingCourse: course }),
    setQuickPaymentVisibility: (isVisible) => set({ showQuickPayment: isVisible }),
    setCartVisitor: (visitor) => set({ cartVisitor: visitor }),
    clearBuyingCourse: () => set({ buyingCourse: null }),
    clearCourseDetails: () => set({ courseDetails: null }),
    clearFormHeading: () => set({ formHeading: null }),
    clearCartVisitor: () => set({ cartVisitor: null }),
    clearCart: () => set({ cart: [] }),
    setPopupFormProps: (props) => set({ popupFormProps: props }),
    clearPopupFormProps: () => set({ popupFormProps: null }),
    setCourseList: (courses) => set({ courseList: courses }),

}))

export default useLmsStore
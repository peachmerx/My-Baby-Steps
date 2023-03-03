test('sets showPopup state to false when called', () => {
    const setShowPopup = jest.fn();
    const closePopup = () => {
        setShowPopup(false);
    };
    closePopup();
    expect(setShowPopup).toHaveBeenCalledWith(false);
});

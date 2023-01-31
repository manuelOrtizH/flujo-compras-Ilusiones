import OptionsCard, { handleSubmit } from '../components/common/OptionsCard';
import "jest-dom/extend-expect";
import { fireEvent, render, screen, wait } from "@testing-library/react";

jest.mock(`${process.env.REACT_APP_API_URL}/warehouses/create_warehouse/`);

test("form makes a api call with proper params", async () => {
    handleSubmit.mockResolvedValueOnce({ok: true});
    render(<OptionsCard/>);
    
    fireEvent.click(screen.getByText('Subir'))
    expect(screen.getByText("Éxito")).toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith("Subir");
    
    await wait(() => null);
});
import Products, { createOrders } from '../components/products/Products';
import "jest-dom/extend-expect";
import { fireEvent, render, screen, wait } from "@testing-library/react";

jest.mock(`${process.env.REACT_APP_API_URL}/orders/create_orders/`);

test("form makes a api call with proper params", async () => {
    createOrders.mockResolvedValueOnce({ok: true});
    render(<Products/>);
    
    fireEvent.click(screen.getByText('Subir'))
    expect(screen.getByText("Éxito")).toBeInTheDocument();
    expect(createOrders).toHaveBeenCalledTimes(1);
    expect(createOrders).toHaveBeenCalledWith("Subir");
    
    await wait(() => null);
});
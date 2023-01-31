import Products, { createProducts } from '../components/products/Products';
import "jest-dom/extend-expect";
import { fireEvent, render, screen, wait } from "@testing-library/react";

jest.mock(`${process.env.REACT_APP_API_URL}/products/create_product/`);

test("form makes a api call with proper params", async () => {
    createProducts.mockResolvedValueOnce({ok: true});
    render(<Products/>);
    
    fireEvent.click(screen.getByText('Subir'))
    expect(screen.getByText("Éxito")).toBeInTheDocument();
    expect(createProducts).toHaveBeenCalledTimes(1);
    expect(createProducts).toHaveBeenCalledWith("Subir");
    
    await wait(() => null);
});
import React from 'react';  // Import React

import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseForm from '@/ui/expense/ExpenseForm';
import { useExpense } from '@/contexts/ExpenseContext';
import { useMainUi } from '@/contexts/MainUiContext';
import { useCategory } from '@/contexts/CategoryContext';
import * as Utils from '@/lib/utils';

jest.mock('@/contexts/ExpenseContext');
jest.mock('@/contexts/MainUiContext');
jest.mock('@/contexts/CategoryContext');
jest.mock('@/lib/utils');

const mockSaveExpense = jest.fn();
const mockSetSubPage = jest.fn();
const mockCategoryList = [
  { _id: '1', name: 'Food' },
  { _id: '2', name: 'Transport' },
];

beforeEach(() => {
  (useExpense as jest.Mock).mockReturnValue({
    userId: 'user123',
    processingStatus: '',
    setProcessingStatus: jest.fn(),
    error: '',
    saveExpense: mockSaveExpense,
  });
  (useMainUi as jest.Mock).mockReturnValue({
    setSubPage: mockSetSubPage,
  });
  (useCategory as jest.Mock).mockReturnValue({
    categoryList: mockCategoryList,
  });
  (Utils.cloneJSONObject as jest.Mock).mockImplementation((data) => JSON.parse(JSON.stringify(data)));
  (Utils.formatDateObjToDbDate as jest.Mock).mockImplementation((date) => date.toISOString().split('T')[0]);
});

describe('ExpenseForm', () => {
    it('renders form fields correctly', () => {
      render(<ExpenseForm data={{}} />);
  
      // Check that all the input fields and buttons are present
      expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    //   expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    //   expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  
    //   expect(screen.getByText(/Save & Go back/i)).toBeInTheDocument();
    //   expect(screen.getByText(/Save & Continue/i)).toBeInTheDocument();
    });
  });
  
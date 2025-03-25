import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/types/transaction";
import { Pencil, Trash } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { capitalize } from "@/lib/utils";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import TransactionForm from "@/components/features/transactions/transaction-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransactionStore } from "@/store/useTransactionStore";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

interface ListOfTransactionsProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function ListOfTransactions({
  transactions,
  onEdit,
  onDelete,
}: ListOfTransactionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  );
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const { loadTransactions } = useTransactionStore();
  const [filterDate, setFilterDate] = useState("");

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (transactionToDelete) {
      await onDelete(transactionToDelete);
      setIsDeleteDialogOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleEditClick = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setIsEditDialogOpen(true);
    onEdit(transaction); // Still call the original onEdit for state management
  };

  const handleEditComplete = () => {
    setIsEditDialogOpen(false);
    setTransactionToEdit(null);
    loadTransactions(); // Refresh the transactions list
  };

  const columns = [
    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ getValue }) =>
        capitalize(format(parseISO(getValue()), "MMMM", { locale: es })),
    },
    { accessorKey: "method", header: "Método de pago" },
    { accessorKey: "category", header: "Categoría" },
    { accessorKey: "description", header: "Descripción" },
    {
      accessorKey: "amount",
      header: "Monto",
      cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: filterDate },
    onGlobalFilterChange: setFilterDate,
  });

  return (
    <>
      <>
        <Input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          placeholder="Filtrar por fecha"
          className="mb-2"
        />
        <Table>
          <TableCaption className="text-xs">
            Lista de transacciones
          </TableCaption>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-xs"
                >
                  No hay transacciones para la fecha seleccionada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirmar eliminación"
        description="¿Estás seguro que deseas eliminar esta transacción? Esta acción no se puede deshacer."
      />

      {/* Edit Transaction Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setTransactionToEdit(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar transacción</DialogTitle>
          </DialogHeader>
          {transactionToEdit && (
            <TransactionForm
              onTransactionAdded={handleEditComplete}
              editingTransaction={transactionToEdit}
              setEditingTransaction={(transaction) => {
                if (!transaction) {
                  setIsEditDialogOpen(false);
                }
                setTransactionToEdit(transaction);
              }}
              inline={true}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

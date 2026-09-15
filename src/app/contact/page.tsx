'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Download, ArrowRight, CheckCircle2, ChevronLeft, Building2, User, Mail, FileText, Target, List, Wallet, Calendar, Info } from "lucide-react";

// Form Schema
const inquirySchema = z.object({
  fullName: z.string().min(2, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional(),
  projectType: z.string().min(2, 'Project type is required'),
  description: z.string().min(10, 'Please provide more details').max(2000),
  objectives: z.string().max(1000).optional(),
  features: z.string().max(1000).optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  additionalInfo: z.string().max(1000).optional(),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export default function ContactPage() {
  const [step, setStep] = useState<'input' | 'review' | 'success'>('input');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    mode: 'onTouched',
  });

  const onReview = async () => {
    const isValid = await trigger();
    if (isValid) {
      setStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to submit inquiry');
      }

      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError('An unexpected error occurred');
      }
      setStep('input');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePDF = async () => {
    try {
      const data = getValues();
      const { jsPDF } = await import('jspdf');
      const autoTable = (await import('jspdf-autotable')).default;
      
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("ZTECH", 14, 20);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text("PROJECT INQUIRY SUMMARY", 14, 28);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 34);
      
      doc.setDrawColor(200);
      doc.line(14, 40, 196, 40);

      // Client Info Table
      autoTable(doc, {
        startY: 45,
        head: [['Client Details', '']],
        body: [
          ['Name', data.fullName],
          ['Email', data.email],
          ['Company', data.company || 'N/A'],
        ],
        theme: 'plain',
        styles: { fontSize: 11, cellPadding: 5 },
        headStyles: { fontStyle: 'bold', textColor: [0, 0, 0] },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const finalY = (doc as any).lastAutoTable.finalY;
      
      // Project Details Table
      autoTable(doc, {
        startY: finalY + 10,
        head: [['Project Specifications', '']],
        body: [
          ['Type', data.projectType],
          ['Budget', data.budget || 'N/A'],
          ['Timeline', data.timeline || 'N/A'],
        ],
        theme: 'plain',
        styles: { fontSize: 11, cellPadding: 5 },
        headStyles: { fontStyle: 'bold', textColor: [0, 0, 0] },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 40 } }
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let yPos = (doc as any).lastAutoTable.finalY + 15;
      
      const addSection = (title: string, content?: string) => {
        if (!content) return;
        
        // Check page break
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0);
        doc.text(title.toUpperCase(), 14, yPos);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80);
        const splitText = doc.splitTextToSize(content, 182);
        doc.text(splitText, 14, yPos + 7);
        
        yPos += 7 + (splitText.length * 5) + 10;
      };

      addSection('Project Description', data.description);
      addSection('Objectives', data.objectives);
      addSection('Desired Features', data.features);
      addSection('Additional Information', data.additionalInfo);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text("Generated securely by ZTech. Casablanca, Morocco.", 14, 285);

      doc.save(`ZTech_Inquiry_${data.fullName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <main className="pt-32 pb-24 min-h-screen relative bg-background overflow-hidden flex flex-col justify-center">
      {/* Brutalist Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 w-full max-w-[100vw] mx-auto px-6 lg:px-12 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 border-t border-border">
          
          {/* Left Column: Heading and Info */}
          <div className="lg:col-span-4 py-12 lg:py-24 lg:pr-12 lg:border-r border-border flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="font-mono text-[10px] tracking-[0.2em] text-blue-500 uppercase mb-8 flex flex-col gap-2">
                <span>[ INITIATE_PROTOCOL ]</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  STATUS: ONLINE
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter leading-[0.85] text-foreground mb-8">
                Start<br/>
                <span className="text-foreground/30">Building.</span>
              </h1>
              <p className="text-foreground/60 font-sans text-sm md:text-base max-w-sm">
                We engineer premium digital products for ambitious brands. Submit your project parameters to begin the discovery phase.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-16 space-y-12 hidden lg:block"
            >
              <div>
                <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-foreground/40" />
                  Direct_Comms
                </h4>
                <a href="mailto:zackhbl400@gmail.com" className="text-xl md:text-2xl font-heading font-bold text-foreground hover:text-blue-400 transition-colors uppercase tracking-tight break-all">
                  zackhbl400@gmail.com
                </a>
              </div>
              <div>
                <h4 className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-foreground/40" />
                  HQ_Coordinates
                </h4>
                <p className="text-2xl font-heading font-bold text-foreground uppercase tracking-tight">
                  Casablanca, Morocco
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column: Form Area */}
          <div className="lg:col-span-8 py-12 lg:py-24 lg:pl-12 lg:pr-6">
            <div className="w-full max-w-3xl">
              
              {submitError && step === 'input' && (
                <div className="mb-8 font-mono text-xs text-red-400 uppercase tracking-wider border border-red-500/30 bg-red-500/10 p-4">
                  ERR: {submitError}
                </div>
              )}

              <AnimatePresence mode="wait">
                
                {/* STEP 1: INPUT FORM */}
                {step === 'input' && (
                  <motion.div
                    key="input-step"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-12 border-b border-border pb-4">
                      <span className="font-mono text-xs text-blue-500 font-bold">01</span>
                      <h3 className="font-heading uppercase tracking-widest text-sm text-foreground/80">Project Parameters</h3>
                    </div>

                    <form className="space-y-10">
                      {/* Personal Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <User size={12} /> Full Name *
                          </label>
                          <input 
                            {...register("fullName")}
                            className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg placeholder:text-muted-foreground/30 rounded-none" 
                            placeholder="John Doe" 
                          />
                          {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <Mail size={12} /> Email Address *
                          </label>
                          <input 
                            {...register("email")}
                            className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg placeholder:text-muted-foreground/30 rounded-none" 
                            placeholder="john@example.com" 
                          />
                          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <Building2 size={12} /> Company (Optional)
                          </label>
                          <input 
                            {...register("company")}
                            className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg placeholder:text-muted-foreground/30 rounded-none" 
                            placeholder="Acme Corp" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <Target size={12} /> Project Type *
                          </label>
                          <select 
                            {...register("projectType")}
                            className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg appearance-none rounded-none cursor-pointer"
                          >
                            <option value="" disabled className="bg-background text-muted-foreground">Select type...</option>
                            <option value="Web Application" className="bg-background">Web Application</option>
                            <option value="Mobile App" className="bg-background">Mobile App</option>
                            <option value="Corporate Website" className="bg-background">Corporate Website</option>
                            <option value="E-Commerce" className="bg-background">E-Commerce</option>
                            <option value="SaaS Platform" className="bg-background">SaaS Platform</option>
                            <option value="Other" className="bg-background">Other</option>
                          </select>
                          {errors.projectType && <p className="text-red-400 text-xs mt-1">{errors.projectType.message}</p>}
                        </div>
                      </div>

                      {/* Core Details */}
                      <div className="space-y-2">
                        <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                          <FileText size={12} /> What do you want to build? *
                        </label>
                        <textarea 
                          {...register("description")}
                          rows={4} 
                          className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg placeholder:text-muted-foreground/30 resize-none rounded-none" 
                          placeholder="Describe your vision, target audience, and core problem you're solving..."
                        />
                        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <Target size={12} /> Main Objectives (Optional)
                          </label>
                          <textarea 
                            {...register("objectives")}
                            rows={3} 
                            className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg placeholder:text-muted-foreground/30 resize-none rounded-none" 
                            placeholder="What does success look like?"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <List size={12} /> Desired Features (Optional)
                          </label>
                          <textarea 
                            {...register("features")}
                            rows={3} 
                            className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg placeholder:text-muted-foreground/30 resize-none rounded-none" 
                            placeholder="Key functionalities needed..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <Wallet size={12} /> Budget Range (Optional)
                          </label>
                          <select 
                            {...register("budget")}
                            className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg appearance-none rounded-none cursor-pointer"
                          >
                            <option value="" className="bg-background">Not specified</option>
                            <option value="<$5k" className="bg-background">Less than $5,000</option>
                            <option value="$5k - $10k" className="bg-background">$5,000 - $10,000</option>
                            <option value="$10k - $25k" className="bg-background">$10,000 - $25,000</option>
                            <option value="$25k+" className="bg-background">$25,000+</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                            <Calendar size={12} /> Preferred Timeline (Optional)
                          </label>
                          <input 
                            {...register("timeline")}
                            className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg placeholder:text-muted-foreground/30 rounded-none" 
                            placeholder="e.g., 2-3 months, Q4 2024" 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                          <Info size={12} /> Additional Details (Optional)
                        </label>
                        <textarea 
                          {...register("additionalInfo")}
                          rows={2} 
                          className="w-full bg-background/50 border-b border-border/50 px-0 py-3 text-foreground focus:outline-none focus:border-blue-500 transition-colors font-sans text-lg placeholder:text-muted-foreground/30 resize-none rounded-none" 
                          placeholder="Anything else we should know?"
                        />
                      </div>

                      <div className="pt-8 flex justify-end">
                        <button 
                          type="button"
                          onClick={onReview}
                          className="flex items-center gap-3 px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-full font-bold uppercase tracking-widest text-xs"
                        >
                          Review Submission <ArrowRight size={16} />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* STEP 2: REVIEW SUMMARY */}
                {step === 'review' && (
                  <motion.div
                    key="review-step"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-8 border-b border-border pb-4">
                      <span className="font-mono text-xs text-blue-500 font-bold">02</span>
                      <h3 className="font-heading uppercase tracking-widest text-sm text-foreground/80">Review Details</h3>
                    </div>

                    <div className="bg-foreground/[0.02] border border-border/50 p-8 rounded-lg space-y-8 mb-8">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div>
                          <p className="font-mono text-[10px] text-muted-foreground uppercase mb-1">Name</p>
                          <p className="font-medium">{getValues('fullName')}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-muted-foreground uppercase mb-1">Email</p>
                          <p className="font-medium">{getValues('email')}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-muted-foreground uppercase mb-1">Company</p>
                          <p className="font-medium">{getValues('company') || '-'}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-muted-foreground uppercase mb-1">Type</p>
                          <p className="font-medium">{getValues('projectType')}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-muted-foreground uppercase mb-1">Budget</p>
                          <p className="font-medium">{getValues('budget') || '-'}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-muted-foreground uppercase mb-1">Timeline</p>
                          <p className="font-medium">{getValues('timeline') || '-'}</p>
                        </div>
                      </div>

                      <div className="border-t border-border/30 pt-6 space-y-6">
                        <div>
                          <p className="font-mono text-[10px] text-muted-foreground uppercase mb-2">Description</p>
                          <p className="text-sm text-foreground/80 whitespace-pre-wrap">{getValues('description')}</p>
                        </div>
                        
                        {getValues('objectives') && (
                          <div>
                            <p className="font-mono text-[10px] text-muted-foreground uppercase mb-2">Objectives</p>
                            <p className="text-sm text-foreground/80 whitespace-pre-wrap">{getValues('objectives')}</p>
                          </div>
                        )}
                        
                        {getValues('features') && (
                          <div>
                            <p className="font-mono text-[10px] text-muted-foreground uppercase mb-2">Features</p>
                            <p className="text-sm text-foreground/80 whitespace-pre-wrap">{getValues('features')}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                      <button 
                        onClick={() => setStep('input')}
                        className="flex items-center gap-2 text-sm font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase"
                        disabled={isSubmitting}
                      >
                        <ChevronLeft size={16} /> Edit Details
                      </button>
                      
                      <MagneticButton 
                        onClick={handleSubmit(onSubmit)}
                        className={`px-10 py-4 bg-blue-600 text-white rounded-full font-bold tracking-widest uppercase text-xs shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-500'}`}
                      >
                        {isSubmitting ? 'TRANSMITTING...' : 'CONFIRM & SUBMIT'}
                      </MagneticButton>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: SUCCESS & DOWNLOAD */}
                {step === 'success' && (
                  <motion.div
                    key="success-step"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 border border-border/50 bg-foreground/[0.01] rounded-2xl p-12"
                  >
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                      <CheckCircle2 size={40} />
                    </div>
                    <div className="font-mono text-xs text-blue-500 tracking-widest uppercase mb-4">
                      TRANSMISSION_SUCCESSFUL
                    </div>
                    <h3 className="text-4xl font-heading font-black text-foreground uppercase tracking-tight mb-4">
                      Inquiry Logged.
                    </h3>
                    <p className="text-foreground/60 mb-12 max-w-md mx-auto">
                      Thank you for reaching out. Our engineering team has received your project parameters and will contact you at <strong>{getValues('email')}</strong> shortly to discuss the next steps.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <button 
                        onClick={generatePDF}
                        className="flex items-center gap-2 px-8 py-4 bg-foreground text-background hover:bg-foreground/90 transition-colors rounded-full font-bold uppercase tracking-widest text-xs w-full sm:w-auto justify-center"
                      >
                        <Download size={16} /> Download Summary
                      </button>
                      
                      <button 
                        onClick={() => {
                          setStep('input');
                          // Simple reset for the form to allow another submission if desired
                          window.location.reload();
                        }}
                        className="font-mono text-xs tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors"
                      >
                        [ Return ]
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

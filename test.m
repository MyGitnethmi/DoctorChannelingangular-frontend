function [f_x] = my_function(x)
  f_x = (1/sqrt(x)) - 1.14 + 2*log10(0.0025/0.1 + 9.35/(30000*sqrt(x)));
end
